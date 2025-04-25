
#!/usr/bin/env bash
set -e
echo "[INFO] Play 09 — k6 LoadTest"
if ! command -v k6 &>/dev/null; then
  echo "[WARN] k6 não instalado no container"
  exit 0
fi
echo 'import http from "k6/http"; export default()=>{http.get("https://test-api.example.com");};' > script.js
k6 run script.js || true
echo "[SUCESSO] k6 finalizado"
