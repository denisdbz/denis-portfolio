#!/bin/bash
echo "Executando teste no dispositivo móvel..."

# Iniciando o Appium
appium &

# Esperando o Appium iniciar
sleep 5

# Executando o teste com o Appium (substitua com o seu comando de teste)
npx webdriverio wdio.conf.js

# Gerando relatório em HTML após o teste
cat <<EOF > relatorio.html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Relatório Mobile</title>
</head>
<body>
  <h2>Resultado dos Testes Mobile</h2>
  <pre>
$(cat appium-results.txt)
  </pre>
</body>
</html>
EOF
