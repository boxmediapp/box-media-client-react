source deploy/bebox.sh
echo "deploying the version 4.0.9-SNAPSHOT to dilshat@dubuntu using the property file deploy/bebox.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh dubuntu dilshat 4.0.9-SNAPSHOT
