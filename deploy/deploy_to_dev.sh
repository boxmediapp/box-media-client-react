source deploy/prod.sh
echo "deploying the version 1.0.0-SNAPSHOT to davran@davran using the property file deploy/prod.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh davran davran 1.0.0-SNAPSHOT
