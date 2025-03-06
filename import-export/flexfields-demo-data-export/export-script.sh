#!/bin/sh

# Set the value of SPACEID to the Space ID of the space you wish to export the FlexFields configuration from
SPACEID="yourSpaceId"
# Set the value of CMATOKEN to the Content Management API token from your space
CMATOKEN="yourCMAToken"
# Set the value of ENVIRONMENT import the data to environment other than master
ENVIRONMENT="master"
# The installation ID of the APP (FlexFields in this case)
APPINSTALLATION="7GbS2x3SdVh7D2hb1FFsS6"
# Contentful CMA URL
REQUESTURL="https://api.contentful.com/spaces/${SPACEID}/environments/${ENVIRONMENT}/app_installations/${APPINSTALLATION}"

curl \
--request GET \
--header "Authorization: Bearer ${CMATOKEN}" \
$REQUESTURL > flexfield-configuration-export.json