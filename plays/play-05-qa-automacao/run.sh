#!/bin/bash
echo "[INFO] Rodando testes Cypress..."

npx cypress run --spec "cypress/e2e/home.cy.js" --reporter mochawesome

echo "[SUCESSO] Teste finalizado. Relatório gerado na pasta cypress/reports."
