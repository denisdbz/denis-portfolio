#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-scanme.nmap.org}"        # host default

echo "[INFO] Iniciando Play 01 — Nmap Recon (modo -sT)"
# -sT  : TCP connect (100 % user-space, sem raw)
# -Pn  : não faz ping/ICMP
/usr/bin/nmap -sT -Pn "$TARGET"

echo "[SUCESSO] Scan concluído."
