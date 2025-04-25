#!/usr/bin/env bash
# plays/play-01-nmap-recon/run.sh
# -------------------------------
# Varredura rápida e 100 % user-mode:
#   • -Pn  → não envia ICMP/ARP (evita raw-socket)
#   • -sT  → TCP connect scan
#   • -p-  → todas as portas
# Resultado fica em output.txt.

set -euo pipefail

echo "[INFO] Iniciando Play 01 — Nmap Recon"

ALVO="scanme.nmap.org"

nmap -Pn -sT -p- -oN output.txt "$ALVO"

echo "[SUCESSO] Varredura finalizada. Relatório salvo em output.txt"
