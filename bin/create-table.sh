#!/usr/bin/env bash

echo "Creating theory-trove-theories table..."
aws dynamodb create-table \
	--table-name theory-trove-theories \
	--attribute-definitions \
		AttributeName=pk,AttributeType=S \
		AttributeName=sk,AttributeType=S \
	--key-schema \
		AttributeName=pk,KeyType=HASH \
		AttributeName=sk,KeyType=RANGE \
	--billing-mode PAY_PER_REQUEST \
	--endpoint-url http://localhost:8000

echo "Creating theory-trove-reactions table..."
aws dynamodb create-table \
	--table-name theory-trove-reactions \
	--attribute-definitions \
		AttributeName=theory_id,AttributeType=S \
		AttributeName=ip_reaction,AttributeType=S \
	--key-schema \
		AttributeName=theory_id,KeyType=HASH \
		AttributeName=ip_reaction,KeyType=RANGE \
	--billing-mode PAY_PER_REQUEST \
	--endpoint-url http://localhost:8000

echo "Done."