#!/bin/bash
echo "[INFO] Iniciando teste de injeção SQL com SQLMap..."

TARGET="http://localhost/vulnerable.php?id=1"
OUTPUT="report.html"

sqlmap -u "$TARGET" --batch --risk=3 --level=5 --random-agent --output-dir=output-sqlmap
sqlmap -u "$TARGET" --batch --risk=3 --level=5 --random-agent --html-report="$OUTPUT"

echo "[SUCESSO] Teste finalizado. Relatório salvo em $OUTPUT"
