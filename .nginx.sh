#!/usr/bin/env bash

RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "Note: To setup SSL certificates on local, please run ${YELLOW}sudo bash install-certificate.sh${NC} first.."

function checkBashVersion() {
    echo "Checking current bash version: ${BASH_VERSION}"
    if [[ "${BASH_VERSINFO:-0}" -lt 4 ]]
    then
        echo -e "\n${RED}> Your bash version is less than 4.X, please update the bash with the following command:${NC}\n"
        echo -e "$ ${YELLOW}brew update && brew install bash${NC}\n"
        echo "exiting..."
        exit
    fi
    echo -e "${GREEN}Current bash version supported! :)${NC}"
}
checkBashVersion

# Hashtable mapping -> country with hostname
declare -A hostNames=(
["in"]="local.booklibrary.in"
["uk"]="local.booklibrary.uk"
)
# Input parameter
country="$@"

# Checking if input parameter is present
if [[ -z "$country" ]]; then
    echo -e "\n${RED}Country parameter is not present.. please add country code as parameter:${NC}\n"
    echo -e "$ ${YELLOW}bash .nginx.sh in${NC}"
    echo -e "$ ${YELLOW}bash .nginx.sh uk${NC}"
    echo -e "\nexiting..."
    exit
fi

NGINX_STATUS=`sudo lsof -c nginx | grep "nginx"`

if [[ -n "$NGINX_STATUS" ]]
then
    echo "Ngnix is already running..."
    echo "Shutting down nginx..."
    sudo nginx -s stop
fi

hostName=${hostNames[${country}]}
echo -e "starting ngnix with ${country} custom config file"
sudo nginx -c "${PWD}/nginx-configs/nginx-${country}.conf"
echo -e "\n========================================================\n"
echo -e "DOMAIN ${GREEN}https://${hostName}${NC} FOR LOCAL"
echo -e "========================================================"
echo "All Done. Have a Good Day..."
