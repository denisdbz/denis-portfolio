
// scripts.js



// === Backend SSE =================
const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  const logs = document.getElementById('output-box') || document.getElementById('logs');
  const barra = document.querySelector('.barra-preenchida') || document.getElementById('progress-fill');
  const container = document.getElementById('progress-container');

  if (!logs || !barra || !container) {
    console.error('Não encontrei elementos de log/barra/container:', logs, barra, container);
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

// === Dados dos posts “Por Dentro” =================
const playPosts = {
  '1': { title: 'Por Dentro do Play 01 — Nmap Recon', description: 'Varredura de portas e identificação de serviços em um host usando Nmap.', objectives: ['Mapear portas TCP/UDP abertas','Detectar serviços e versões'], commands: ['nmap -sV -p1-65535 <TARGET_IP>'], expected: ['Lista detalhada de portas e serviços'], links: { play: 'plays/play-01-nmap-recon/index.html', home: 'index.html' } },
  '2': { title: 'Por Dentro do Play 02 — Hydra DVWA', description: 'Ataque de força-bruta no formulário de login do DVWA usando Hydra.', objectives: ['Testar resistência de autenticação','Encontrar credenciais fracas'], commands: ['hydra -l admin -P passwords.txt -s 80 127.0.0.1 http-post-form "/login.php:username=^USER^&password=^PASS^&Login=Login:Login failed" -t 4'], expected: ['Credenciais válidas exibidas'], links: { play: 'plays/play-02-hydra-dvwa/index.html', home: 'index.html' } },
  '3': { title: 'Por Dentro do Play 03 — SQLMap DVWA', description: 'Exploração automática de SQL Injection no DVWA com SQLMap.', objectives: ['Identificar parâmetros vulneráveis','Extrair dados do banco'], commands: ['sqlmap -u "http://127.0.0.1:8081/vulnerabilities/sqli/?id=1" --batch --dump'], expected: ['Dump de tabelas vulneráveis'], links: { play: 'plays/play-03-sqlmap-dvwa/index.html', home: 'index.html' } },
  '4': { title: 'Por Dentro do Play 04 — JMeter LoadTest', description: 'Teste de carga sem interface gráfica usando JMeter.', objectives: ['Simular usuários simultâneos','Coletar métricas de latência'], commands: ['jmeter -n -t teste-carga.jmx -l resultados.jtl'], expected: ['Gravação de resultados em JTL'], links: { play: 'plays/play-04-jmeter-loadtest/index.html', home: 'index.html' } },
  '5': { title: 'Por Dentro do Play 05 — QA Automação', description: 'Automação de testes de interface com Cypress.', objectives: ['Validar fluxos críticos','Gerar relatórios de testes'], commands: ['npx cypress run --spec "cypress/integration/**/*.spec.js"'], expected: ['Relatórios de cenário concluídos'], links: { play: 'plays/play-05-qa-automacao/index.html', home: 'index.html' } },
  '6': { title: 'Por Dentro do Play 06 — Carga Bash', description: 'Script Bash para gerar carga HTTP contínua.', objectives: ['Enviar múltiplas requisições','Medir tempo de resposta'], commands: ['./run.sh 127.0.0.1'], expected: ['Logs de tempos de cada requisição'], links: { play: 'plays/play-06-carga-bash/index.html', home: 'index.html' } },
  '7': { title: 'Por Dentro do Play 07 — Testes Mobile', description: 'Automação de testes em apps Android usando Appium.', objectives: ['Interagir com UI mobile','Capturar evidências'], commands: ['appium --session-override'], expected: ['Relatórios de execução no Appium'], links: { play: 'plays/play-07-mobile-tests/index.html', home: 'index.html' } },
  '8': { title: 'Por Dentro do Play 08 — Nikto Scan', description: 'Escaneamento de vulnerabilidades web com Nikto.', objectives: ['Detectar falhas comuns','Gerar relatório HTML'], commands: ['nikto -h http://127.0.0.1:8081'], expected: ['Vulnerabilidades listadas'], links: { play: 'plays/play-08-nikto-scan/index.html', home: 'index.html' } },
  '9': { title: 'Por Dentro do Play 09 — k6 LoadTest', description: 'Teste de carga de APIs em JS usando k6.', objectives: ['Simular tráfego concorrente','Coletar RPS/latência'], commands: ['k6 run script.js'], expected: ['Gráficos de performance'], links: { play: 'plays/play-09-k6-loadtest/index.html', home: 'index.html' } },
  '10':{ title: 'Por Dentro do Play 10 — API Validation', description: 'Validação de APIs REST com Newman.', objectives: ['Verificar contratos','Checar status code'], commands: ['newman run collection.json'], expected: ['Relatório de execução'], links: { play: 'plays/play-10-api-validation/index.html', home: 'index.html' } },
  '11':{ title: 'Por Dentro do Play 11 — XSS Scanner', description: 'Detecção de XSS em aplicações web.', objectives: ['Injetar payloads','Identificar vulnerabilidades'], commands: ['./run.sh http://127.0.0.1:8081'], expected: ['Locais vulneráveis listados'], links: { play: 'plays/play-11-xss-scanner/index.html', home: 'index.html' } },
  '12':{ title: 'Por Dentro do Play 12 — CSRF Checker', description: 'Testes de proteção contra CSRF.', objectives: ['Validar tokens CSRF','Executar requisições simuladas'], commands: ['./run.sh http://127.0.0.1:8081'], expected: ['Indicação de ausência de token'], links: { play: 'plays/play-12-csrf-checker/index.html', home: 'index.html' } },
  '13':{ title: 'Por Dentro do Play 13 — API Fuzzing', description: 'Fuzzing de APIs REST usando ffuf.', objectives: ['Enviar payloads aleatórios','Descobrir parâmetros ocultos'], commands: ['ffuf -u http://127.0.0.1:5000/FUZZ -w wordlist.txt'], expected: ['Parâmetros descobertos'], links: { play: 'plays/play-13-api-fuzzing/index.html', home: 'index.html' } },
  '14':{ title: 'Por Dentro do Play 14 — Dependency CVE Audit', description: 'Auditoria de dependências com Dependency-Check.', objectives: ['Identificar CVEs'], commands: ['./run.sh'], expected: ['Lista de CVEs'], links: { play: 'plays/play-14-dependency-cve-audit/index.html', home: 'index.html' } },
  '15':{ title: 'Por Dentro do Play 15 — SSL/TLS Health Check', description: 'Verificação SSL/TLS com sslscan.', objectives: ['Testar protocolos/ciphers'], commands: ['sslscan 127.0.0.1:443'], expected: ['Ciphers e falhas'], links: { play: 'plays/play-15-ssl-tls-health-check/index.html', home: 'index.html' } },
  '16':{ title: 'Por Dentro do Play 16 — Docker Vulnerability Scan', description: 'Escaneamento de Docker com Trivy.', objectives: ['Detectar CVEs'], commands: ['trivy image my-image:latest'], expected: ['Relatório de CVEs'], links: { play: 'plays/play-16-docker-vulnerability-scan/index.html', home: 'index.html' } },
  '17':{ title: 'Por Dentro do Play 17 — Kubernetes Config Audit', description: 'Auditoria de Kubernetes com kube-bench.', objectives: ['Verificar CIS'], commands: ['kube-bench --benchmark cis-1.6'], expected: ['Relatório CIS'], links: { play: 'plays/play-17-kubernetes-config-audit/index.html', home: 'index.html' } },
  '18':{ title: 'Por Dentro do Play 18 — OWASP ZAP Scan', description: 'Escaneamento OWASP ZAP.', objectives: ['Scan passivo/ativo'], commands: ['zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" http://127.0.0.1'], expected: ['Relatório Top 10'], links: { play: 'plays/play-18-owasp-zap-automated-scan/index.html', home: 'index.html' } },
  '19':{ title: 'Por Dentro do Play 19 — Static Analysis Python Bandit', description: 'Análise estática com Bandit.', objectives: ['Detectar code smells'], commands: ['bandit -r .'], expected: ['Issues reportadas'], links: { play: 'plays/play-19-static-analysis-python-bandit/index.html', home: 'index.html' } },
  '20':{ title: 'Por Dentro do Play 20 — IaC Security Audit Terraform', description: 'Auditoria Terraform com Checkov.', objectives: ['Verificar políticas'], commands: ['checkov -d .'], expected: ['Políticas violadas'], links: { play: 'plays/play-20-iac-security-audit-terraform/index.html', home: 'index.html' } },
  '21':{ title: 'Por Dentro do Play 21 — JWT Token Pentest', description: 'Teste de tokens JWT.', objectives: ['Validar assinatura','Testar expiração'], commands: ['./run.sh <TARGET>'], expected: ['Falhas reportadas'], links: { play: 'plays/play-21-jwt-token-penetration-test/index.html', home: 'index.html' } },
  '22':{ title: 'Por Dentro do Play 22 — Supply Chain Check', description: 'Verificação de supply chain com Syft & Grype.', objectives: ['Auditar depêndencias'], commands: ['syft packages dir:. -o json | grype -'], expected: ['Vulnerabilidades encontradas'], links: { play: 'plays/play-22-dependency-supply-chain-check/index.html', home: 'index.html' } }
};

// === Abre o modal “Por Dentro” ========
function openModalPorDentro(id) {
  const post = playPosts[id];
  if (!post) {
    console.error('Post não encontrado:', id);
    return;
  }
  document.getElementById('modal-title').textContent = post.title;
  document.getElementById('modal-desc').textContent = post.description;

  const ulObj = document.getElementById('modal-objectives');
  ulObj.innerHTML = '';
  post.objectives.forEach(o => {
    const li = document.createElement('li'); li.textContent = o; ulObj.appendChild(li);
  });

  const ulCmd = document.getElementById('modal-commands');
  ulCmd.innerHTML = '';
  post.commands.forEach(c => {
    const li = document.createElement('li'); li.textContent = c; ulCmd.appendChild(li);
  });

  const ulExp = document.getElementById('modal-expected');
  ulExp.innerHTML = '';
  post.expected.forEach(e => {
    const li = document.createElement('li'); li.textContent = e; ulExp.appendChild(li);
  });

  document.getElementById('modal-play-btn').href = post.links.play;
  document.getElementById('modal-home-btn').href = post.links.home;

  // Adiciona barra de rolagem caso conteúdo ultrapasse altura
  document.querySelector('#modal-por-dentro .modal-content').style.overflowY = 'auto';
  document.querySelector('#modal-por-dentro .modal-content').style.maxHeight = '80vh';

  document.getElementById('modal-por-dentro').classList.remove('hidden');
}

// === Eventos “Por Dentro” ===
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openModalPorDentro(btn.getAttribute('data-play-id'));
  });
});

// === Fecha modais ===
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.add('hidden');
  });
});

// === Abre modais da navbar ===
document.querySelectorAll('button[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const m = document.getElementById(`modal-${btn.dataset.modal}`);
    if (m) m.classList.remove('hidden');
  });
});

// === Alterna tema claro/escuro ===
const themeToggle = document.querySelector('.toggle-theme');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  });
}

// === Inicializa gráfico “Sobre” com Chart.js ===
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('sobre-chart');
  if (ctx && window.Chart) {
    new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['2011','2014','2016','2018','2020','2024'],
        datasets: [{
          label: 'Anos de Experiência',
          data: [1,3,5,7,9,12],
          backgroundColor: 'rgba(0, 255, 224, 0.7)'
        }]
      },
      options: {
        scales: { y: { beginAtZero: true, title: { display: true, text: 'Anos' } } }
      }
    });
  }
});
