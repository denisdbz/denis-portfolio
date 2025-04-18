#!/bin/bash
cd ../avaliacao-qa-automacao
npm install
npx cypress run > ../denis-portfolio/play-04-cypress/output.txt

echo "<html><head><style>body{background:black;color:white;font-family:monospace;}</style></head><body><h1>Cypress Test Report</h1><pre>$(cat ../denis-portfolio/play-04-cypress/output.txt)</pre></body></html>" > ../denis-portfolio/play-04-cypress/index.html
