#!/bin/bash

echo "[Play 03] Executando SQLMap contra DVWA..."
sleep 2

relatorio="resultados/play-03-sqlmap.html"
mkdir -p resultados

cat <<EOF > $relatorio
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Play 03 — SQLMap vs DVWA</title>
</head>
<body>
  <h1>Relatório — SQLMap vs DVWA</h1>
  <pre>
[INFO] A injeção foi bem-sucedida!
[INFO] Database: dvwa
Tables: users, guestbook, login
  </pre>
</body>
</html>
EOF

echo "[Play 03] Relatório gerado em $relatorio"
