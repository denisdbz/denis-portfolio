#!/bin/bash
echo "[INFO] Executando teste de carga com k6..."
k6 run - < <(echo "
import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  http.get('http://localhost:8080');
  sleep(1);
}")
echo "[SUCESSO] Teste k6 finalizado."
