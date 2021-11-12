# Running localhost on HTTPs for all the countries

- Install nginx
- Please run `install-certificate.sh` first with root privileges and then run `.nginx.sh`
- Only Bash version 4 and above is supported, please update if not latest (script will give the cmd to run)
- `sudo bash install-certificate.sh` will do the following tasks-
  - Changed the domain name to `local.booklibrary.in`
  - Add hostname entries in /etc/host
  - Generate SSL configurations for all the countries
  - Install SSL certificates for your machine
  - Clean-up after everything is done.
- Run `.nginx.sh` with a country parameter such as
  - `bash .nginx.sh in`
  - `bash .nginx.sh uk`
