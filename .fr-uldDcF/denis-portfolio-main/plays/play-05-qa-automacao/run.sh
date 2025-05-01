#!/usr/bin/env bash
echo "[INFO] Play 05 – QA Automação"
if command -v xvfb-run &> /dev/null; then
  xvfb-run --auto-servernum --server-args="-screen 0 1280x720x24" npx cypress run
else
  echo "[WARN] xvfb-run não disponível, execute localmente com GUI ou instale Xvfb"
fi
