source deploy/prod.sh
echo "deploying the version 5.0.2-SNAPSHOT to ec2-user@image.boxnetwork.co.uk using the property file deploy/prod.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh image.boxnetwork.co.uk ec2-user 5.0.2-SNAPSHOT
