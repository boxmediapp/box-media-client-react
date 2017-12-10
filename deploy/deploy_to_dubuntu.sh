source deploy/prod.sh
echo "deploying the version 1.0.1-SNAPSHOT to dilshat@dubuntu using the property file deploy/prod.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh dubuntu dilshat 1.0.1-SNAPSHOT
