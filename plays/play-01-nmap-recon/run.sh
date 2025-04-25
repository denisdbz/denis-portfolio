#!/usr/bin/env bash
# Play 01 — Nmap Recon (modo seguro -sT)
set -euo pipefail

TARGET="${1:-scanme.nmap.org}"          # host padrão (pode trocar)
OUT_TXT="output.txt"

echo "[INFO] Iniciando Play 01 — Nmap Recon (modo -sT)"
echo "[INFO] Alvo: $TARGET"

# -sT  → TCP-connect (não precisa raw socket/root)
# -Pn  → não faz ping antes de escanear
#      se o nmap devolver erro, ignoramos o exit-code (|| true)
nmap -sT -Pn "$TARGET" -oN "$OUT_TXT" || true

echo
cat "$OUT_TXT"
echo
echo "[SUCESSO] Varredura finalizada."
