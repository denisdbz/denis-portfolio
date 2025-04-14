#!/bin/bash
# Play 01 - Nmap Recon contra DVWA
# Denis Pentest Portfolio

echo "[*] Executando Nmap contra o container DVWA (assumindo IP 172.18.0.5)"
nmap -sC -sV -oN result.txt 172.18.0.5

echo "[*] Gerando relatório HTML"
echo "<html><body><h1>Resultado do Nmap</h1><pre>$(cat result.txt)</pre></body></html>" > report.html

echo "[*] Finalizado."
