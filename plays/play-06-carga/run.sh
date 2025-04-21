#!/bin/bash
echo "Executando teste de carga..."

# Testando a carga com Apache Benchmark
ab -n 1000 -c 50 http://target.com/

# Gerando relatório em HTML
cat <<EOF > relatorio.html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Teste de Carga</title>
</head>
<body>
  <h2>Resultado do Teste de Carga</h2>
  <pre>
$(cat ab-results.txt)
  </pre>
</body>
</html>
EOF
