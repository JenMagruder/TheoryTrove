from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

frontend = os.getenv("FRONTEND_URL")
backend = os.getenv("BACKEND_URL")

origins = [frontend, backend]
CORS(app, resources={r"/api/*": {"origins": origins}})

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)