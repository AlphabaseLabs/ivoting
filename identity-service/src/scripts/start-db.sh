#!/bin/bash
set -e

SERVER="identity_portal_db";
PW="${POSTGRES_PASSWORD:-your_postgres_password_here}";
DB="idp";
USER="identity_portal";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker-compose up -d identity_portal_db

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 2;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U $USER -d postgres
echo "\l" | docker exec -i $SERVER psql -U $USER