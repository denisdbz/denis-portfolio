#!/bin/bash

echo "Executando SQLMap..."
cat <<EOF > relatorio.html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Relatório SQLMap</title>
</head>
<body>
  <h2>Resultado SQLMap</h2>
  <pre>
$(echo "[*] Simulação do SQLMap: Vulnerabilidade detectada em 'id'")
  </pre>
</body>
</html>
EOF
