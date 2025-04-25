
#!/usr/bin/env bash
set -e
echo "[INFO] Iniciando Play 01 — Nmap Recon (sT)"
TARGET="scanme.nmap.org"
nmap --unprivileged -sT -Pn -oN output.txt "$TARGET" || true
echo "[SUCESSO] Varredura concluída."
