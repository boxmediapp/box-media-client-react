source deploy/prod.sh
echo "deploying the version 1.0.3-SNAPSHOT to ec2-user@image.boxnetwork.co.uk using the property file deploy/prod.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh image.boxnetwork.co.uk ec2-user 1.0.3-SNAPSHOT
