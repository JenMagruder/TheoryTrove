from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import os
import uuid
from datetime import datetime, timezone

app = Flask(__name__)

frontend = os.getenv("FRONTEND_URL")
backend = os.getenv("BACKEND_URL")

origins = [frontend, backend]
CORS(app, resources={r"/api/*": {"origins": origins}})

dynamodb = boto3.resource(
    "dynamodb",
    region_name=os.getenv("AWS_DEFAULT_REGION", "us-east-1"),
    endpoint_url=os.getenv("DYNAMODB_ENDPOINT")
)

sns = boto3.client(
    "sns",
    region_name=os.getenv("AWS_DEFAULT_REGION", "us-east-1")
)

table = dynamodb.Table("theory-trove-theories")
reactions_table = dynamodb.Table("theory-trove-reactions")

VALID_REACTIONS = ["star", "flame", "heart", "moon", "sword", "mask"]

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/theories", methods=["GET"])
def get_theories():
    response = table.query(
        KeyConditionExpression="pk = :pk",
        ExpressionAttributeValues={":pk": "THEORY"},
        ScanIndexForward=False
    )
    return jsonify(response["Items"])

@app.route("/api/theories", methods=["POST"])
def post_theory():
    data = request.get_json()
    theory_text = data.get("theory_text", "").strip()
    tags = data.get("tags", [])
    reference = data.get("reference", "")

    if not theory_text or len(theory_text) > 280:
        return jsonify({"error": "Theory must be between 1 and 280 characters"}), 400

    item = {
        "pk": "THEORY",
        "sk": datetime.now(timezone.utc).isoformat(),
        "theory_id": str(uuid.uuid4()),
        "theory_text": theory_text,
        "tags": tags,
        "reference": reference,
        "status": "active",
        "reactions": {
            "star": 0,
            "flame": 0,
            "heart": 0,
            "moon": 0,
            "sword": 0,
            "mask": 0
        }
    }

    table.put_item(Item=item)
    return jsonify({"message": "Theory submitted"}), 201

@app.route("/api/theories/<theory_id>/react", methods=["POST"])
def react_to_theory(theory_id):
    data = request.get_json()
    reaction_type = data.get("reaction_type", "star")

    if reaction_type not in VALID_REACTIONS:
        return jsonify({"error": "Invalid reaction type"}), 400

    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    ip_reaction_key = f"{ip}#{reaction_type}"

    try:
        reactions_table.put_item(
            Item={"theory_id": theory_id, "ip_reaction": ip_reaction_key},
            ConditionExpression="attribute_not_exists(theory_id) AND attribute_not_exists(ip_reaction)"
        )
    except dynamodb.meta.client.exceptions.ConditionalCheckFailedException:
        return jsonify({"error": "Already reacted"}), 409

    response = table.scan(
        FilterExpression="theory_id = :id",
        ExpressionAttributeValues={":id": theory_id}
    )
    items = response.get("Items", [])
    if not items:
        return jsonify({"error": "Theory not found"}), 404

    theory = items[0]
    table.update_item(
        Key={"pk": theory["pk"], "sk": theory["sk"]},
        UpdateExpression="SET reactions.#rt = if_not_exists(reactions.#rt, :zero) + :inc",
        ExpressionAttributeNames={"#rt": reaction_type},
        ExpressionAttributeValues={":zero": 0, ":inc": 1}
    )
    return jsonify({"message": "Reaction added"}), 200

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    if not name or not message:
        return jsonify({"error": "Name and message are required"}), 400

    sns_topic_arn = os.getenv("SNS_TOPIC_ARN")

    if sns_topic_arn:
        sns.publish(
            TopicArn=sns_topic_arn,
            Subject=f"Theory Trove Contact: {subject or 'No subject'}",
            Message=f"From: {name}\n\n{message}"
        )

    return jsonify({"message": "Message sent"}), 200

@app.route("/api/admin/theories/<theory_id>", methods=["DELETE"])
def delete_theory(theory_id):
    admin_key = request.headers.get("X-Admin-Key")
    if admin_key != os.getenv("ADMIN_KEY"):
        return jsonify({"error": "Unauthorized"}), 401

    response = table.scan(
        FilterExpression="theory_id = :id",
        ExpressionAttributeValues={":id": theory_id}
    )
    items = response.get("Items", [])
    if not items:
        return jsonify({"error": "Theory not found"}), 404

    theory = items[0]
    table.delete_item(
        Key={"pk": theory["pk"], "sk": theory["sk"]}
    )
    return jsonify({"message": "Theory deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)