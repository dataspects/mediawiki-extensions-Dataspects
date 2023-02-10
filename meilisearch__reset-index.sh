#!/bin/bash

# DS_MEILI_MASTERKEY= MEILI_SERVER= INDEX= ./meilisearch__reset-index.sh

# if [[ -z "$DS_MEILI_MASTERKEY" ]]; then
#   echo 'DS_MEILI_MASTERKEY missing'
#   exit
# fi
# if [[ -z "$DS_MEILI_SERVER" ]]; then
#   echo 'MEILI_SERVER missing'
#   exit
# fi
# if [[ -z "$DS_MEILI_INDEX" ]]; then
#   echo 'INDEX missing'
#   exit
# fi

DS_MEILI_MASTERKEY=masterKey
MEILI_SERVER=http://localhost:7700
INDEX=mwstakeorg

# Delete
echo "DELETE? Meili server and index: $DS_MEILI_SERVER and $DS_MEILI_INDEX"
read -p "Continue? (y/n)" -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo
    exit
fi
curl --silent --insecure \
  -X DELETE "$DS_MEILI_SERVER/indexes/$DS_MEILI_INDEX" \
  -H "Authorization: Bearer $DS_MEILI_MASTERKEY" \
   | jq .

# Create
echo "CREATE? Meili server and index: $DS_MEILI_SERVER and $DS_MEILI_INDEX"
read -p "Continue? (y/n)" -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo
    exit
fi

curl --silent --insecure \
  -X POST "$DS_MEILI_SERVER/indexes" \
  -H "Authorization: Bearer $DS_MEILI_MASTERKEY" \
  -H 'Content-Type: application/json' \
  --data-binary "{
    \"uid\": \"$DS_MEILI_INDEX\",
    \"primaryKey\": \"id\"
  }" \
  | jq .

# Settings
echo "SETTINGS? Meili server and index: $DS_MEILI_SERVER and $DS_MEILI_INDEX"
read -p "Continue? (y/n)" -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo
    exit
fi

curl --silent --insecure \
  -X PATCH "$DS_MEILI_SERVER/indexes/$DS_MEILI_INDEX/settings" \
  -H "Authorization: Bearer $DS_MEILI_MASTERKEY" \
  -H 'Content-Type: application/json' \
  --data @src/indexsettings.json \
  | jq .