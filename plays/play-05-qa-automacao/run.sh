#!/bin/bash
echo "[INFO] Iniciando Play 05 — QA Automação"

npx cypress run --spec "cypress/e2e/home.cy.js" --browser chrome --reporter mochawesome

if [ $? -eq 0 ]; then
  echo "[SUCESSO] Relatório Cypress gerado em cypress/reports"
else
  echo "[ERRO] Falha nos testes Cypress"
fi
