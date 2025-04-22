#!/bin/bash
echo "Executando Nmap no alvo..."
nmap -sS -Pn 192.168.0.1 > resultado.txt
echo "Relatório gerado em resultado.txt"
