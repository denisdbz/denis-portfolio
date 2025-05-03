#!/bin/bash

echo "Iniciando teste..."
sleep 1
echo "Executando Nmap no alvo..."

nmap scanme.nmap.org -F -T4 -oN resultado.txt

echo "Relatório gerado em resultado.txt"
cat resultado.txt
