// scripts.js

// URL do seu back-end no Railway
const baseURL = 'https://mellow-commitment-production.up.railway.app';

// Função que dispara o play real via EventSource
function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  const logs = document.getElementById('output-log')
            || document.getElementById('output-box')
            || document.getElementById('logs');
  const barra = document.getElementById('progress-fill')
             || document.querySelector('.barra-preenchida')
             || document.querySelector('.fill');
  const container = document.getElementById('progress-container');

  if (!logs || !barra || !container) {
    console.error('Container de log/barra não encontrado:', logs, barra, container);
    return;
  }

  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  const source = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  source.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = () => source.close();
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) Toggle de tema claro/escuro
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }

  // 2) Busca dinâmica de Plays
  const searchInput = document.getElementById('search');
  const playsSection = document.getElementById('plays');
  if (searchInput && playsSection) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      playsSection.querySelectorAll('.card').forEach(card => {
        const txt = (
          card.querySelector('h3').textContent +
          card.querySelector('p').textContent
        ).toLowerCase();
        card.style.display = txt.includes(term) ? '' : 'none';
      });
    });
  }

  // 3) Configuração de todos os modais + inicialização “lazy” do gráfico
  let sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name = btn.dataset.modal;                       // "sobre","ajuda","news"
    const modal = document.getElementById(`modal-${name}`);
    if (!modal) return;

    // Ao clicar, abre modal
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');

      // Se for o modal “Sobre”, inicializa (ou redimensiona) o Chart
      if (name === 'sobre') {
        const canvas = document.getElementById('sobre-chart');
        if (canvas && window.Chart) {
          const ctx = canvas.getContext('2d');
          if (!sobreChart) {
            sobreChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['QA', 'Pentest', 'Automação', 'DevSecOps'],
                datasets: [{
                  label: 'Anos de Experiência',
                  data: [5, 4, 4, 3],
                  backgroundColor: 'rgba(0,255,224,0.5)',
                  borderColor: 'rgba(0,255,224,1)',
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
              }
            });
          } else {
            sobreChart.resize();
          }
        }
      }
    });

    // Fechar no “×”
    modal.querySelectorAll('.close-modal').forEach(x =>
      x.addEventListener('click', () => modal.classList.add('hidden'))
    );
    // Fechar clicando fora do conteúdo
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

  // 4) ESC fecha qualquer modal aberto
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)')
        .forEach(m => m.classList.add('hidden'));
    }
  });

  // 5) Carregar notícias “ao vivo” no modal News
  const NEWS_API_KEY = 'KTeKQv1H4PHbtVhF_fwXVLvA178RVJ6z13A_KqgZuYuxLGp3';
  const newsList = document.getElementById('news-list');
  if (newsList) {
    fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${NEWS_API_KEY}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => {
        newsList.innerHTML = '';
        (json.news || []).slice(0, 6).forEach(item => {
          const card = document.createElement('div');
          card.className = 'news-card';
          card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description || ''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          newsList.appendChild(card);
        });
      })
      .catch(err => {
        console.error(err);
        newsList.innerHTML = `<p>Erro ao carregar notícias: ${err.message}</p>`;
      });
  }

  // 6) Modal “Por Dentro”: iframe com a página do play
// ================================================
// “Por Dentro” – POSTS DE CADA PLAY (01–22)
// ================================================
const playPosts = {
  "01": `
    <h1>Por Dentro do Play 01 — Nmap Recon</h1>
    <p>Usamos <strong>Nmap</strong> para varredura de portas e identificação de serviços em um host alvo.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Mapear portas TCP/UDP abertas</li>
      <li>Detectar versões de serviços em execução</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>nmap -sV -p 1-65535 &lt;TARGET_IP&gt;</code></li>
      <li><code>nmap -O &lt;TARGET_IP&gt;</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Lista de portas abertas e serviços</li>
      <li>Identificação de sistema operacional</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-01-nmap-recon/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "02": `
    <h1>Por Dentro do Play 02 — Hydra DVWA</h1>
    <p>Usamos <strong>THC Hydra</strong> para brute-force no formulário de login do DVWA.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Testar resistência de autenticação via formulário web</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>hydra -l admin -P passwords.txt -s 80 dvwa http-post-form "/login.php:username=^USER^&password=^PASS^&Login=Login:Login failed" -t 4</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Credenciais válidas capturadas e exibidas</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-02-hydra-dvwa/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "03": `
    <h1>Por Dentro do Play 03 — SQLMap DVWA</h1>
    <p>Automatizamos teste de <strong>SQL Injection</strong> no DVWA com SQLMap.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Identificar parâmetros vulneráveis</li>
      <li>Extrair dados do banco automaticamente</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>sqlmap -u "http://dvwa/vulnerabilities/sqli/?id=1" --batch --dbs</code></li>
      <li><code>sqlmap --tables -D dvwa --batch</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Esquema do banco e dados sensíveis extraídos</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-03-sqlmap-dvwa/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "04": `
    <h1>Por Dentro do Play 04 — JMeter LoadTest</h1>
    <p>Executamos testes de carga não-GUI com <strong>Apache JMeter</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Simular usuários simultâneos</li>
      <li>Coletar métricas de performance</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>jmeter -n -t teste-carga.jmx -l resultados.jtl</code></li>
      <li><code>jmeter -g resultados.jtl -o report-html</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório HTML com tempos de resposta</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-04-jmeter-loadtest/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "05": `
    <h1>Por Dentro do Play 05 — QA Automação</h1>
    <p>Automatizamos testes de interface web com <strong>Cypress</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Validar fluxos críticos de aplicação</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>npx cypress run --spec "cypress/integration/**/*.spec.js"</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de testes e capturas de telas</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-05-qa-automacao/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "06": `
    <h1>Por Dentro do Play 06 — Carga Bash</h1>
    <p>Simulamos carga via script Bash em loop de requisições HTTP.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Testar estabilidade sob carga simples</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>bash run.sh</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Logs de latência e taxa de sucesso das requisições</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-06-carga-bash/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "07": `
    <h1>Por Dentro do Play 07 — Testes Mobile</h1>
    <p>Automatizamos testes em aplicativos Android com <strong>Appium</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Validar funcionalidades mobile críticas</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>bash run.sh</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de testes e capturas de tela</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-07-mobile-tests/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "08": `
    <h1>Por Dentro do Play 08 — Nikto Scan</h1>
    <p>Escaneamos vulnerabilidades web com <strong>Nikto</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Detectar problemas de configuração e falhas comuns</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>nikto -h &lt;TARGET&gt;</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Lista de vulnerabilidades conhecidas</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-08-nikto-scan/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "09": `
    <h1>Por Dentro do Play 09 — k6 LoadTest</h1>
    <p>Realizamos testes de performance de API com <strong>k6</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Medir throughput e latência sob carga virtual</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>k6 run script.js</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Métricas de performance em tempo real</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-09-k6-loadtest/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "10": `
    <h1>Por Dentro do Play 10 — API Validation</h1>
    <p>Validamos endpoints RESTful com <strong>Postman/Newman</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Verificar contratos e respostas de API</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>newman run collection.json</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de execuções e falhas</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-10-api-validation/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "11": `
    <h1>Por Dentro do Play 11 — XSS Scanner</h1>
    <p>Detectamos vulnerabilidades de Cross-Site Scripting com ferramenta customizada.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Identificar pontos de injeção XSS</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>bash run.sh</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Lista de payloads e locais vulneráveis</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-11-xss-scanner/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "12": `
    <h1>Por Dentro do Play 12 — CSRF Checker</h1>
    <p>Verificamos falhas de CSRF em aplicações web.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Testar proteção contra requisições cross-site</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>bash run.sh</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Indicadores de ausência de tokens CSRF</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-12-csrf-checker/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "13": `
    <h1>Por Dentro do Play 13 — API Fuzzing</h1>
    <p>Geramos cargas randômicas para APIs com <strong>Ffuf</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Descobrir entradas não tratadas ou crashes</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>ffuf -w wordlist.txt -u http://TARGET/FUZZ</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Respostas inesperadas ou erros 500</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-13-api-fuzzing/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "14": `
    <h1>Por Dentro do Play 14 — Dependency CVE Audit</h1>
    <p>Auditamos dependências de projeto com <strong>OWASP Dependency-Check</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Identificar CVEs em bibliotecas</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>dependency-check.sh --project myapp --scan .</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de vulnerabilidades de dependências</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-14-dependency-cve-audit/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "15": `
    <h1>Por Dentro do Play 15 — SSL/TLS Health Check</h1>
    <p>Validamos certificados SSL/TLS com <strong>sslscan</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Verificar protocolos e cipher suites</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>sslscan TARGET_DOMAIN</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de protocolos e potenciais falhas</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-15-ssl-tls-health-check/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "16": `
    <h1>Por Dentro do Play 16 — Docker Vulnerability Scan</h1>
    <p>Escaneamos imagens Docker em busca de CVEs usando <strong>Trivy</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Detectar vulnerabilidades em imagens containerizadas</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>trivy image my-image:latest</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Lista de CVEs e severidade</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-16-docker-vulnerability-scan/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "17": `
    <h1>Por Dentro do Play 17 — Kubernetes Config Audit</h1>
    <p>Avaliamos configurações de cluster Kubernetes com <strong>kube-bench</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Identificar práticas inseguras em YAML de K8s</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>kube-bench --benchmark cis-1.6</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de checks pass/fail</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-17-kubernetes-config-audit/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "18": `
    <h1>Por Dentro do Play 18 — OWASP ZAP Automated Scan</h1>
    <p>Realizamos varredura automática de vulnerabilidades web com <strong>OWASP ZAP</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Detectar falhas comuns de segurança</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>zap-cli quick-scan --self-contained --start-options '-config api.disablekey=true' http://TARGET</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de vulnerabilidades OWASP Top 10</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-18-owasp-zap-automated-scan/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "19": `
    <h1>Por Dentro do Play 19 — Static Analysis Python (Bandit)</h1>
    <p>Rodamos análise estática de código Python usando <strong>Bandit</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Detectar problemas de segurança em código-fonte</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>bandit -r .</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Lista de issues de segurança e recomendações</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-19-static-analysis-python-bandit/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "20": `
    <h1>Por Dentro do Play 20 — IaC Security Audit (Terraform)</h1>
    <p>Auditamos templates Terraform com <strong>Checkov</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Detectar falhas em IaC antes do provisionamento</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>checkov -d .</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Relatório de políticas violadas</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-20-iac-security-audit-terraform/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "21": `
    <h1>Por Dentro do Play 21 — JWT Token Penetration Test</h1>
    <p>Testamos manipulação de tokens JWT e validações de assinatura.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Validar assinatura e expiração de tokens</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>bash run.sh</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Detectar tokens forjados ou expirados usados indevidamente</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-21-jwt-token-penetration-test/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `,
  "22": `
    <h1>Por Dentro do Play 22 — Dependency Supply Chain Check</h1>
    <p>Inspecionamos dependências NPM/PyPI contra ataques de supply-chain com <strong>Syft + Grype</strong>.</p>
    <h2>Objetivos</h2>
    <ul>
      <li>Detectar pacotes comprometidos em supply chain</li>
    </ul>
    <h2>Comandos Utilizados</h2>
    <ul>
      <li><code>syft packages dir:. -o json | grype -</code></li>
    </ul>
    <h2>Resultados Esperados</h2>
    <ul>
      <li>Lista de vulnerabilidades e pacotes suspeitos</li>
    </ul>
    <hr class="separator">
    <div class="btn-box">
      <a class="btn" href="/denis-portfolio/plays/play-22-dependency-supply-chain-check/" target="_blank">▶️ Ir ao Play</a>
      <a class="btn" href="/denis-portfolio/index.html">← Voltar à Home</a>
    </div>
  `
};

// --------------------------------------------------------------------------
// INJETANDO NO MODAL “Por Dentro”
document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.btn-por-dentro');
  const modal = document.getElementById('modal-por-dentro');
  const content = document.getElementById('modal-play-content');
  const close = modal.querySelector('.close-modal');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const playId = btn.dataset.play;
      content.innerHTML = playPosts[playId] || '<p>Post não disponível.</p>';
      modal.classList.remove('hidden');
    });
  });

  close.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});
// ================================================
