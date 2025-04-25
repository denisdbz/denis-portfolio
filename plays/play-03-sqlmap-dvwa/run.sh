#!/bin/bash
echo "[INFO] Iniciando Play 03 — SQLMap em DVWA"
TARGET="http://localhost:80/dvwa/vulnerable.php?id=1"
REPORT="sqlmap-report.html"

sqlmap -u "$TARGET" --batch --risk=3 --level=5 --random-agent --html-report="$REPORT"

echo "[SUCESSO] Teste concluído. Relatório: $REPORT"
