
#!/bin/bash

echo "Executando Nmap no alvo..."
sleep 1
nmap -sT -F scanme.nmap.org -oN resultado.txt 2>&1
echo "Relatório gerado em resultado.txt"
cat resultado.txt
