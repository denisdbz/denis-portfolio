#!/usr/bin/env bash
set -e
echo "[INFO] Iniciando Play 01 — Nmap Recon (user-mode)"
TARGET="scanme.nmap.org"
nmap --unprivileged -sT -Pn -oN output.txt "$TARGET" || true
echo "[SUCESSO] Varredura concluída. Veja output.txt"
