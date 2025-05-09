#!/usr/bin/env bash
set -euo pipefail

# Caminho para o root do portfolio — adapte se precisar
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 1) Sobrescreve scripts.js na raiz
cat > "$ROOT_DIR/scripts.js" <<'EOF'
// scripts.js — global para todos os plays
const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  const slug = window.location.pathname.split('/').slice(-2, -1)[0];
  const m    = slug.match(/^play-(\d{2})/);
  const playId = m ? parseInt(m[1], 10) : slug;

  const container = document.getElementById('progress-container');
  container.style.display = 'flex';

  const logs  = document.getElementById('output-box');
  const barra = document.getElementById('progress-bar-fill');
  logs.textContent = 'Iniciando execução...\n';
  barra.style.width  = '0%';

  const source = new EventSource(\`\${baseURL}/api/play/\${playId}/stream\`);
  source.onmessage = e => {
    const text = e.data;
    logs.textContent += text + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
    if (text.match(/Teste finalizado/)) {
      barra.style.width = '100%';
    }
  };
  source.onerror = () => {
    barra.style.width = '100%';
    source.close();
  };
}

window.executarTeste = executarTeste;
EOF

echo "✔️ scripts.js atualizado."

# 2) Para cada index.html de cada play:
PLAY_DIR="$ROOT_DIR/plays"
for html in "$PLAY_DIR"/play-*/index.html; do
  echo "Processando $html …"

  # Remove linhas que incluam runScript.js ou duplicatas de scripts.js
  sed -i '/runScript\.js/d' "$html"
  sed -i '/\.\.\/\.\.\/scripts\.js/d' "$html"

  # Insere o include correto logo antes de </body>
  sed -i '/<\/body>/i\  <script src="../../scripts.js" defer></script>' "$html"
done

echo "✔️ Todos os index.html padronizados."

# 3) Opcional: remova os antigos runScript.js
# Uncomment abaixo se quiser apagar todos os runScript.js
# find "$PLAY_DIR" -type f -name runScript.js -exec rm -v {} \;

echo "✅ Atualização concluída! Agora basta git add, commit e push."
