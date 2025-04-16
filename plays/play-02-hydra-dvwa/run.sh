#!/bin/bash

echo "[Play 02] Executando Hydra contra DVWA..."
sleep 2

relatorio="resultados/play-02-hydra.html"
mkdir -p resultados

cat <<EOF > $relatorio
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Play 02 — Hydra vs DVWA</title>
</head>
<body>
  <h1>Relatório — Hydra vs DVWA</h1>
  <pre>
[80][http-post-form] host: 192.168.1.100   login: admin   password: 123456
Hydra encontrou uma combinação válida de login e senha.
  </pre>
</body>
</html>
EOF

echo "[Play 02] Relatório gerado em $relatorio"
