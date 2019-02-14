#!/bin/bash

echo "REMINDER: Run 'ng build --watch -c local' before running this"

cp dist/assets/data/appConfig-local-proxy.json dist/assets/data/appConfig.json
docker build -f local.Dockerfile -t mvn-search .

docker run \
-p 80:80 \
--name mvn-search \
--rm \
-v ${PWD}/dist:/usr/share/nginx/html \
mvn-search:latest
