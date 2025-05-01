#!/bin/bash

echo "Iniciando teste de carga com JMeter..."

# Caminho para o arquivo .jmx
JMX_FILE="plays/play-04-carga-jmeter/teste-carga.jmx"

# Arquivo de saída
OUTPUT_FILE="plays/play-04-carga-jmeter/report.txt"

# Verifica se o arquivo .jmx existe
if [ ! -f "$JMX_FILE" ]; then
  echo "Arquivo JMX não encontrado em $JMX_FILE"
  exit 1
fi

# Executa o teste JMeter em modo não-gráfico
jmeter -n -t "$JMX_FILE" -l resultado.jtl > "$OUTPUT_FILE" 2>&1

echo "Teste concluído. Relatório salvo em $OUTPUT_FILE"
