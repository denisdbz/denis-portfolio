#!/bin/bash
echo "Iniciando teste de carga com k6..."
k6 run - < <(echo '
import http from "k6/http";
import { sleep } from "k6";
export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
')
