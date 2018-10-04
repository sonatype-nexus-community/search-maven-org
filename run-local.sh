#!/bin/bash

echo "REMINDER: Run 'ng build --watch -c local' before running this"

docker stop mvn-search && docker rm mvn-search
docker build -f local.Dockerfile -t mvn-search .
docker run \
-p 80:80 \
--name mvn-search \
-v `pwd`/dist:/usr/share/nginx/html \
mvn-search:latest