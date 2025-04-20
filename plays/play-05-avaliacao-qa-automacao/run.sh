#!/bin/bash
echo "Executando teste de QA..."

# Exemplo com Selenium (verifique se o Selenium está instalado)
# Se não estiver usando Selenium, substitua pelo seu framework de automação
python3 -m pytest --maxfail=1 --disable-warnings -q

# Gerando relatório HTML após o teste
cat <<EOF > relatorio.html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Relatório QA Automação</title>
</head>
<body>
  <h2>Resultado dos Testes de QA</h2>
  <pre>
$(cat result.log)
  </pre>
</body>
</html>
EOF
