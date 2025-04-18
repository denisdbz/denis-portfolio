#!/bin/bash

TARGET="192.168.1.104"  # Pode alterar para o IP desejado
OUTPUT_XML="plays/nmap-play/relatorios/scan_$TARGET.xml"
OUTPUT_HTML="plays/nmap-play/relatorios/scan_$TARGET.html"

echo "[+] Iniciando varredura Nmap no alvo $TARGET..."
nmap -sV -O "$TARGET" -oX "$OUTPUT_XML"

echo "[+] Convertendo resultado para HTML..."
xsltproc "$OUTPUT_XML" -o "$OUTPUT_HTML"

echo "[✔] Relatório gerado em: $OUTPUT_HTML"
