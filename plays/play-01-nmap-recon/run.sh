#!/bin/bash

echo "[INFO] Iniciando varredura com Nmap..."
sleep 1
nmap -sT -p- -T4 scanme.nmap.org -oN output.txt
echo "[SUCESSO] Varredura concluída!"
cat output.txt
