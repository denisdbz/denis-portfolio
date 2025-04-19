#!/bin/bash

echo "Executando teste de carga com Artillery..."

artillery quick --count 100 -n 1 http://localhost:3000/api/usuarios > saida_artillery.json

echo "Gerando relatório em HTML..."

artillery report saida_artillery.json -o relatorio.html

echo "Relatório gerado: relatorio.html"
