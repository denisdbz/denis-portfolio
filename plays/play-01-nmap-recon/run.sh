K#!/bin/bash
echo "[INFO] Iniciando varredura com Nmap..."

TARGET="scanme.nmap.org"
OUTPUT="report.html"

nmap -A -T4 $TARGET -oX output.xml
xsltproc output.xml -o $OUTPUT

echo "[SUCESSO] Varredura concluída. Relatório salvo em $OUTPUT"

