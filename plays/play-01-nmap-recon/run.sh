#!/bin/bash
echo "Executando Nmap no alvo..."
nmap -sT -p- -T4 scanme.nmap.org -oN resultado.txt
echo "Relatório gerado em resultado.txt"
cat resultado.txt
