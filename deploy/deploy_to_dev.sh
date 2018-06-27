source deploy/prod.sh
echo "deploying the version 5.0.2-SNAPSHOT to davran@davran using the property file deploy/prod.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh davran davran 5.0.2-SNAPSHOT
