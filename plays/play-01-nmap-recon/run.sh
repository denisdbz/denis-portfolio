#!/bin/bash

TARGET="dvwa.local"
OUTPUT="relatorio.html"

echo "Executando Nmap em $TARGET..."

cat <<EOF > $OUTPUT
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Relatório - Nmap</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="report-container">
    <h2>Relatório do Nmap</h2>
    <pre>
$(nmap -sS -Pn $TARGET)
    </pre>
  </div>
</body>
</html>
EOF

echo "Relatório gerado em $OUTPUT"
