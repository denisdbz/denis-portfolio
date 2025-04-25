#!/bin/bash
echo "[INFO] Iniciando Play 08 — Nikto Scan"

nikto -h http://localhost:8080 -o relatorio_nikto.txt

echo "[SUCESSO] Relatório salvo em relatorio_nikto.txt"
