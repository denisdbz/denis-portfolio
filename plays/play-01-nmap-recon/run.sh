#!/bin/bash
echo "[INFO] Iniciando Play 01 — Nmap Recon"
TARGET="192.168.1.1"
OUTPUT_XML="output.xml"
OUTPUT_HTML="report.html"

nmap -A -T4 $TARGET -oX $OUTPUT_XML
xsltproc $OUTPUT_XML -o $OUTPUT_HTML

echo "[SUCESSO] Varredura finalizada. Relatório: $OUTPUT_HTML"
