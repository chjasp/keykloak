#!/bin/sh
GOOGLE_PROJECT_ID=bdaa-dq-radar-dev-438nbs9k
CLOUD_RUN_SERVICE=dqr-backend

gcloud builds submit --tag eu.gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --project=$GOOGLE_PROJECT_ID

