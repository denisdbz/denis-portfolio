#!/bin/bash
echo "[INFO] Testando API com curl..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health)
if [ "$response" == "200" ]; then
  echo "[SUCESSO] API está no ar e saudável."
else
  echo "[ERRO] API retornou código $response"
fi
