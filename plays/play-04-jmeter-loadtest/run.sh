#!/bin/bash
echo "Executando teste de carga com JMeter..."
sleep 1
jmeter -n -t teste-carga.jmx -l resultados.jtl
echo "Teste de carga finalizado."
