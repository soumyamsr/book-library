#!/usr/bin/env bash

if [[ "$EUID" -ne 0 ]]
  then echo "Please run as root"
  exit
fi

RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

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

# All countries array
countries=('in' 'uk')

# Hashtable mapping -> country with hostname
declare -A hostNames=(
["in"]="local.booklibrary.in"
["uk"]="local.booklibrary.uk"
)
currentDir=${PWD}

function addHostNames() {
    echo -e "${YELLOW}\n==============================================="
    echo -e "Adding hostname entries for all the countries"
    echo -e "===============================================${NC}"

    ETC_HOSTS=/etc/hosts
    IP="127.0.0.1"

    for i in "${countries[@]}"
    do
        country=${i}
        hostName=${hostNames[${country}]}
        HOSTS_LINE="${IP}\t${hostName}"

        echo -e "\nChecking Hostname ${hostName}"

        if [[ -n "$(grep ${hostName} /etc/hosts)" ]]
        then
            echo "$hostName already exists..."
        else
            echo "Adding $hostName to your $ETC_HOSTS";
            sudo -- sh -c -e "echo '$HOSTS_LINE' >> /etc/hosts";

            if [[ -n "$(grep ${hostName} /etc/hosts)" ]]
            then
                echo -e "$hostName was added successfully \n $(grep ${hostName} /etc/hosts)";
            else
                echo "Failed to Add $hostName, Try again!";
                exit
            fi
        fi
    done
    echo "==============================================="
}

function generateSSLConfigurations() {
    echo -e "${YELLOW}\n==============================================="
    echo "SSL Configuration generation started"
    echo -e "===============================================${NC}"
    echo "Creating a temporary directory 'private' for configurations"
    mkdir -p private && cd $_
    for i in "${countries[@]}"
    do
        country=${i}
        domain=${hostNames[${country}]}
        echo -e "Generating SSL configuration for ${country} in ${YELLOW} localhost.${country}.conf ${NC}"
        sudo bash -c "cat << EOF > localhost.${country}.conf
[req]
default_bits       = 2048
default_keyfile    = localhost.${country}.key
distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_ca

[req_distinguished_name]
countryName                 = Country Name (2 letter code)
countryName_default         = US
stateOrProvinceName         = State or Province Name (full name)
stateOrProvinceName_default = New York
localityName                = Locality Name (eg, city)
localityName_default        = Rochester
organizationName            = Organization Name (eg, company)
organizationName_default    = localhost
organizationalUnitName      = organizationalunit
organizationalUnitName_default = Development
commonName                  = Common Name (e.g. server FQDN or YOUR name)
commonName_default          = ${domain}
commonName_max              = 64

[req_ext]
subjectAltName = @alt_names

[v3_ca]
subjectAltName = @alt_names

[alt_names]
DNS.1   = localhost
DNS.2   = 127.0.0.1
DNS.3   = ${domain}
EOF"
    done
    cd ".."
    echo "Generating SSL configuration done..."
    echo "==============================================="
}

function cleanup() {
    echo -e "${YELLOW}\n==============================================="
    echo "Cleaning up temporary directory for SSL configuration.."
    echo -e "===============================================${NC}"
    rm -rf "${PWD}/private"
    echo "==============================================="
}

function installCertificates() {
    addHostNames
    generateSSLConfigurations

    echo -e "${YELLOW}\n==============================================="
    echo "Installing SSL certificates"
    echo -e "===============================================${NC}"
    cd /etc/ssl
    sudo mkdir -p private

    cd "${currentDir}"
    for i in "${countries[@]}"
    do
        country=${i}
        echo -e "\nSSL certificate installation started for ${country}"

        sudo -- sh -c -e "openssl req -batch -x509 -nodes -days 365 -newkey rsa:2048 -keyout private/localhost.${country}.key -out private/localhost.${country}.crt -config private/localhost.${country}.conf"
        sudo -- sh -c -e "cp private/localhost.${country}.key /etc/ssl/private/localhost.${country}.key"
        sudo -- sh -c -e "cp private/localhost.${country}.crt /etc/ssl/certs/localhost.${country}.crt"
        sudo -- sh -c -e "security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /etc/ssl/certs/localhost.${country}.crt"

        echo "SSL certificate installation done for ${country}"
    done
    echo "==============================================="
    cleanup

    echo "All Done. Have a Good Day..."
}

# Run this func in case you have broken setup or
# to start fresh if you're facing any problems
function cleanupAllConfiguration() {
    cd "${currentDir}"
    cleanup
}

installCertificates
