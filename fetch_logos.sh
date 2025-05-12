#!/bin/bash
# Script para baixar logos das ferramentas para assets/img/tools/

mkdir -p assets/img/tools

# Nmap logo
curl -L -o assets/img/tools/nmap.png \
  https://upload.wikimedia.org/wikipedia/commons/5/5c/Nmap_logo.svg

# Hydra logo
curl -L -o assets/img/tools/hydra.png \
  https://upload.wikimedia.org/wikipedia/commons/5/5a/THC_Hydra_Logo.png

# SQLMap logo
curl -L -o assets/img/tools/sqlmap.png \
  https://upload.wikimedia.org/wikipedia/commons/2/2b/SQLMap-logo.png

# Curl logo
curl -L -o assets/img/tools/curl.png \
  https://upload.wikimedia.org/wikipedia/commons/6/68/Curl_logo.svg

# Bash logo
curl -L -o assets/img/tools/bash.png \
  https://upload.wikimedia.org/wikipedia/commons/a/ab/Gnu-bash-logo.svg

# JMeter logo
curl -L -o assets/img/tools/jmeter.png \
  https://upload.wikimedia.org/wikipedia/commons/6/6b/Apache_JMeter_icon.svg

# Cypress logo
curl -L -o assets/img/tools/cypress.png \
  https://avatars.githubusercontent.com/u/21723386?s=200&v=4

# Appium logo
curl -L -o assets/img/tools/appium.png \
  https://upload.wikimedia.org/wikipedia/commons/8/84/Appium.png

# Nikto logo
curl -L -o assets/img/tools/nikto.png \
  https://upload.wikimedia.org/wikipedia/commons/4/4e/Nikto2logo.png

# k6 logo
curl -L -o assets/img/tools/k6.png \
  https://avatars.githubusercontent.com/u/22096062?s=200&v=4

# Postman logo
curl -L -o assets/img/tools/postman.png \
  https://upload.wikimedia.org/wikipedia/commons/8/86/Postman-logo.svg

echo "Logos baixados em assets/img/tools/"
