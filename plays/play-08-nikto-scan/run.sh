#!/bin/bash
echo "[INFO] Executando scan com Nikto..."
nikto -h http://localhost:8080 -o relatorio_nikto.txt
echo "[SUCESSO] Relatório salvo em relatorio_nikto.txt"
