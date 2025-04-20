#!/bin/bash

echo "Executando SQLMap..."

# Comando SQLMap real para testar vulnerabilidades
sqlmap -u "http://target.com/vulnerable?id=1" --batch --risk=3 --level=5 -o -t 10 --output-dir=./ --format=HTML

# Gerando relatório em HTML
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
$(cat ./output-dir/sqlmap-report.html)
  </pre>
</body>
</html>
EOF
