#!/bin/bash
echo "[INFO] Iniciando simulação de carga com loops em bash..."
for i in {1..100}
do
  echo "Requisição $i"
  curl -s http://localhost > /dev/null
done
echo "[SUCESSO] Teste de carga finalizado."
