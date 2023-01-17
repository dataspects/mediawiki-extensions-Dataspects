#!/bin/bash

# MEILI_MASTER_KEY= MEILI_SERVER= INDEX= ./meilisearch__reset-index.sh

if [[ -z "$MEILI_MASTER_KEY" ]]; then
  echo 'MEILI_MASTER_KEY missing'
  exit
fi
if [[ -z "$MEILI_SERVER" ]]; then
  echo 'MEILI_SERVER missing'
  exit
fi
if [[ -z "$INDEX" ]]; then
  echo 'INDEX missing'
  exit
fi

echo "Meili server and index: $MEILI_SERVER and $INDEX"
read -p "Continue? (y/n)" -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo
    exit
fi

curl --silent --insecure \
  -X POST "$MEILI_SERVER/indexes" \
  -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  -H 'Content-Type: application/json' \
  --data-binary "{
    \"uid\": \"$INDEX\",
    \"primaryKey\": \"id\"
  }" \
  | jq .

echo "Meili server and index: $MEILI_SERVER and $INDEX"
read -p "Continue? (y/n)" -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo
    exit
fi

curl --silent --insecure \
  -X PATCH "$MEILI_SERVER/indexes/$INDEX/settings" \
  -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  -H 'Content-Type: application/json' \
  --data @src/indexsettings.json \
  | jq .