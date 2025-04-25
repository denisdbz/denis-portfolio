#!/bin/bash
echo "[INFO] Iniciando Play 04 — JMeter LoadTest"

if ! command -v jmeter &> /dev/null; then
  echo "[ERRO] JMeter não encontrado."
  exit 1
fi

SCRIPT="teste-carga.jmx"
REPORT="report.jtl"

jmeter -n -t "$SCRIPT" -l "$REPORT"

if [ $? -eq 0 ]; then
  echo "[SUCESSO] Relatório gerado: $REPORT"
else
  echo "[ERRO] Falha no teste JMeter"
fi
