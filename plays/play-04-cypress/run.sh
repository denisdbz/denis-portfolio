#!/bin/bash
echo "Executando testes Cypress reais com Docker..."
docker-compose up --build --abort-on-container-exit
