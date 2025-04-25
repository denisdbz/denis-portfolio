#!/bin/bash
echo "[INFO] Iniciando Play 09 — K6 LoadTest"

k6 run - <<EOF
import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  http.get('http://localhost:8080/api/health');
  sleep(1);
}
EOF

echo "[SUCESSO] Teste k6 concluído."
