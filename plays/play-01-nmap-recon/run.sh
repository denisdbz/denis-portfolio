#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-scanme.nmap.org}"
OUT_DIR="$(dirname "$0")"
RAW="$OUT_DIR/output.txt"

echo "[INFO] Iniciando Play 01 — Nmap Recon"
# -sT = TCP connect scan       -Pn = não faz ping (evita ICMP bloqueado)
# -n  = sem DNS reverse        -oN = saída normal
/usr/bin/nmap -sT -Pn -n -oN "$RAW" "$TARGET"

echo "[SUCESSO] Varredura finalizada. Relatório: $RAW"
cat "$RAW"
