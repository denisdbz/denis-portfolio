#!/usr/bin/env bash
# plays/play-01-nmap-recon/run.sh
# -------------------------------
# Varredura Nmap “TCP connect” (-sT) — não exige raw-socket
# e dispensa a conversão XSLT para HTML (xsltproc).

set -euo pipefail

echo "[INFO] Iniciando Play 01 — Nmap Recon"

# Alvo de demonstração (troque se quiser)
ALVO="scanme.nmap.org"

# 1) varredura completa de portas usando -sT (evita “Operation not permitted”)
# 2) saída normal em texto (output.txt)
nmap -sT -p- -oN output.txt "$ALVO"

echo "[SUCESSO] Varredura finalizada. Relatório salvo em output.txt"
