#!/usr/bin/env bash
set -e

# 1) Cria pasta temporária
WORKDIR=./_package_tmp
rm -rf "$WORKDIR"
mkdir "$WORKDIR"

# 2) Copia root files aprovados
cp index.html style.css scripts.js service-worker.js manifest.json app.py "$WORKDIR/"

# 3) Extrai os plays que você já aprovou (1-15 e 16-22)
#    Ajuste os nomes dos zips caso estejam em outros locais
unzip -q novos_plays_all.zip   -d "$WORKDIR"
unzip -q novos_plays_16_22.zip -d "$WORKDIR"

# 4) Copia os posts aprovados (1-22)
#    Se você tiver um posts.zip com 1-15 e outro com 16-22, faça o unzip também
#    senão, copie manualmente:
# cp -r posts "$WORKDIR/"

# 5) Empacota tudo
OUTPUT=portfolio_aprovado.zip
rm -f "$OUTPUT"
cd "$WORKDIR"
zip -r "../$OUTPUT" ./*
cd ..
rm -rf "$WORKDIR"

echo "Pacote gerado: $OUTPUT"
