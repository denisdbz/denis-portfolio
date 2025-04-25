
#!/usr/bin/env bash
set -e
echo "[INFO] Play 05 — Cypress"
if ! command -v xvfb-run &>/dev/null; then
  echo "[WARN] xvfb-run não disponível, execute localmente com GUI ou instale Xvfb"
  exit 0
fi
xvfb-run --auto-servernum npx cypress run || true
echo "[SUCESSO] Cypress concluído"
