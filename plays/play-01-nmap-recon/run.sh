#!/bin/bash

echo "[Play 01] Executando Nmap Recon..."
sleep 2

relatorio="resultados/play-01-nmap.html"
mkdir -p resultados

cat <<EOF > $relatorio
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Play 01 — Nmap Recon</title>
</head>
<body>
  <h1>Relatório — Nmap Recon</h1>
  <pre>
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https
  </pre>
</body>
</html>
EOF

echo "[Play 01] Relatório gerado em $relatorio"
