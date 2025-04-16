#!/bin/bash

echo "[*] Executando todos os plays..."

# Executa o Play 01
cd plays/play-01-nmap
./run.sh

# Executa o Play 02
cd ../play-02-hydra-dvwa
./run.sh

# Executa o Play 03
cd ../play-03-sqlmap-dvwa
./run.sh

echo "[*] Todos os testes executados com sucesso!"
