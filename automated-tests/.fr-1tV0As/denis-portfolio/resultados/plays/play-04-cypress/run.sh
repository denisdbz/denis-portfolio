#!/bin/bash
echo "Executando teste Cypress..."

# Executando testes com o Cypress
npx cypress run

# Gerando relatório HTML após os testes
cat <<EOF > relatorio.html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Relatório Cypress</title>
</head>
<body>
  <h2>Resultado dos Testes Cypress</h2>
  <pre>
$(cat cypress/results/*)
  </pre>
</body>
</html>
EOF
