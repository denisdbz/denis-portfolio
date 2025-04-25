#!/bin/bash
echo "[INFO] Iniciando Play 06 — Carga Bash"

for i in {1..50}; do
  echo "[LOG] Requisição $i"
  curl -s http://localhost:8080 > /dev/null
done

echo "[SUCESSO] Teste de carga finalizado."
