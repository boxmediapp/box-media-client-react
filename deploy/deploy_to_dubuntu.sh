source deploy/bebox.sh
echo "deploying the version 1.0.8-SNAPSHOT to dilshat@dubuntu using the property file deploy/bebox.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh dubuntu dilshat 1.0.8-SNAPSHOT
