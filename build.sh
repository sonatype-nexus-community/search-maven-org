#!/bin/bash

ng build --prod
rm dist/assets/data/appConfig.json
cp dist/assets/data/appConfig-prod.json dist/assets/data/appConfig.json
rm dist/assets/data/appConfig-prod.json
