#!/bin/bash

echo "[INFO] Iniciando varredura com Nmap..."
sleep 1

# Executa a varredura e redireciona saída para arquivo
nmap -sT -p- -T4 scanme.nmap.org -oN output.txt

# Confirma execução
if [ $? -eq 0 ]; then
  echo "[SUCESSO] Varredura concluída!"
else
  echo "[ERRO] Falha ao executar o Nmap."
fi

# Exibe as 10 primeiras linhas do output como amostra
echo ">>> Resultado da varredura:"
head -n 10 output.txt
