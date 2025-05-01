#!/bin/bash

echo "Executando todos os testes..."
echo "Executando play-01-nmap-recon..."
bash plays/play-01-nmap-recon/run.sh

echo "Executando play-02-hydra-dvwa..."
bash plays/play-02-hydra-dvwa/run.sh

echo "Executando play-03-sqlmap-dvwa..."
bash plays/play-03-sqlmap-dvwa/run.sh

echo "Executando play-04-cypress..."
bash plays/play-04-cypress/run.sh

echo "Executando play-05-avaliacao-qa-automacao..."
bash plays/play-05-avaliacao-qa-automacao/run.sh

echo "Executando play-06-carga..."
bash plays/play-06-carga/run.sh

echo "Executando play-07-mobile..."
bash plays/play-07-mobile/run.sh
