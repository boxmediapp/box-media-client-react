source deploy/prod.sh
echo "deploying the version 5.0.2-SNAPSHOT to ec2-user@bemediaapp.iterativesolution.co.uk using the property file deploy/prod.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh bemediaapp.iterativesolution.co.uk ec2-user 5.0.2-SNAPSHOT
