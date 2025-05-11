// scripts.js

// === Configuração do backend SSE =================
const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  const logs = document.getElementById('output-log')
            || document.getElementById('output-box')
            || document.getElementById('logs');
  const barra = document.querySelector('.barra-preenchida')
             || document.getElementById('progress-bar-fill')
             || document.getElementById('progress-fill');
  const container = document.getElementById('progress-container');

  if (!logs || !barra || !container) {
    console.error('Não encontrei o container de log/barra:', logs, barra, container);
    return;
  }

  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  const source = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  source.onmessage = (e) => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = () => source.close();
}


// === Dados dos posts “Por Dentro” =================
const playPosts = {
  '1': { title: 'Por Dentro do Play 01 — Nmap Recon', description: 'Varredura de portas e detecção de serviços com Nmap.', objectives: ['Mapear portas abertas', 'Identificar serviços e versões'], commands: ['nmap -sV -oN resultado.txt 127.0.0.1'], expected: ['Relatório de portas e serviços'], links: { play: 'plays/play-01-nmap-recon/index.html', home: 'index.html' } },
  '2': { title: 'Por Dentro do Play 02 — Hydra DVWA', description: 'Força bruta de login no DVWA usando Hydra.', objectives: ['Testar resistência de autenticação', 'Descobrir credenciais fracas'], commands: ['hydra -l admin -P passwords.txt http-post-form://127.0.0.1:8081/login.php:username=^USER^&password=^PASS^&Login=Login'], expected: ['Senhas simples identificadas'], links: { play: 'plays/play-02-hydra-dvwa/index.html', home: 'index.html' } },
  '3': { title: 'Por Dentro do Play 03 — SQLMap DVWA', description: 'Automatização de testes de SQL Injection com SQLMap no DVWA.', objectives: ['Detectar falhas de SQL Injection', 'Extrair dados do banco'], commands: ['sqlmap -u "http://127.0.0.1:8081/vulnerabilities/sqli/?id=1&Submit=Submit" --batch --dump'], expected: ['Dump de tabelas vulneráveis'], links: { play: 'plays/play-03-sqlmap-dvwa/index.html', home: 'index.html' } },
  '4': { title: 'Por Dentro do Play 04 — JMeter LoadTest', description: 'Teste de carga com JMeter em modo não gráfico.', objectives: ['Simular múltiplos usuários', 'Avaliar desempenho'], commands: ['jmeter -n -t teste-carga.jmx -l resultados.jtl'], expected: ['Gráfico de latência e throughput'], links: { play: 'plays/play-04-jmeter-loadtest/index.html', home: 'index.html' } },
  '5': { title: 'Por Dentro do Play 05 — QA Automação', description: 'Automação de testes de interface com Cypress.', objectives: ['Automatizar fluxos de UI', 'Validar funcionalidades'], commands: ['npx cypress run'], expected: ['Relatório de testes automáticos'], links: { play: 'plays/play-05-qa-automacao/index.html', home: 'index.html' } },
  '6': { title: 'Por Dentro do Play 06 — Carga Bash', description: 'Script Bash para gerar carga HTTP em loop.', objectives: ['Enviar requisições contínuas', 'Observar estabilidade'], commands: ['./run.sh 127.0.0.1'], expected: ['Métricas de resposta'], links: { play: 'plays/play-06-carga-bash/index.html', home: 'index.html' } },
  '7': { title: 'Por Dentro do Play 07 — Testes Mobile', description: 'Testes em Android com Appium.', objectives: ['Automatizar fluxo mobile', 'Validar funcionalidades'], commands: ['appium --session-override'], expected: ['Relatório de testes em dispositivo'], links: { play: 'plays/play-07-mobile-tests/index.html', home: 'index.html' } },
  '8': { title: 'Por Dentro do Play 08 — Nikto Scan', description: 'Scanner de vulnerabilidades web usando Nikto.', objectives: ['Detectar diretórios inseguros', 'Relatar falhas'], commands: ['nikto -h http://127.0.0.1'], expected: ['Lista de vulnerabilidades'], links: { play: 'plays/play-08-nikto-scan/index.html', home: 'index.html' } },
  '9': { title: 'Por Dentro do Play 09 — K6 LoadTest', description: 'Teste de carga com k6 via script JS.', objectives: ['Simular usuários virtuais', 'Medições de performance'], commands: ['k6 run teste.js'], expected: ['Métricas de VUs e RPS'], links: { play: 'plays/play-09-k6-loadtest/index.html', home: 'index.html' } },
  '10': { title: 'Por Dentro do Play 10 — API Validation', description: 'Validação de APIs REST com scripts Bash.', objectives: ['Testar endpoints', 'Verificar contratos'], commands: ['bash run.sh'], expected: ['Status codes e JSON válidos'], links: { play: 'plays/play-10-api-validation/index.html', home: 'index.html' } },
  '11': { title: 'Por Dentro do Play 11 — XSS Scanner', description: 'Detecção de XSS reflexivo em aplicações.', objectives: ['Encontrar pontos XSS', 'Gerar relatório'], commands: ['./run.sh http://127.0.0.1'], expected: ['Payloads refletidos'], links: { play: 'plays/play-11-xss-scanner/index.html', home: 'index.html' } },
  '12': { title: 'Por Dentro do Play 12 — CSRF Checker', description: 'Checagem de CSRF em formulários web.', objectives: ['Validar tokens CSRF', 'Testar endpoints de alteração'], commands: ['./run.sh http://127.0.0.1'], expected: ['Falhas de CSRF detectadas'], links: { play: 'plays/play-12-csrf-checker/index.html', home: 'index.html' } },
  '13': { title: 'Por Dentro do Play 13 — API Fuzzing', description: 'Fuzzing de APIs com ferramentas automáticas.', objectives: ['Enviar payloads aleatórios', 'Identificar crashes'], commands: ['./run.sh'], expected: ['Logs de erros no backend'], links: { play: 'plays/play-13-api-fuzzing/index.html', home: 'index.html' } },
  '14': { title: 'Por Dentro do Play 14 — Dependency CVE Audit', description: 'Auditoria de dependências em busca de CVEs.', objectives: ['Verificar bibliotecas vulneráveis'], commands: ['bash run.sh'], expected: ['Lista de CVEs encontrados'], links: { play: 'plays/play-14-dependency-cve-audit/index.html', home: 'index.html' } },
  '15': { title: 'Por Dentro do Play 15 — SSL/TLS Health Check', description: 'Verificação de configurações SSL/TLS.', objectives: ['Testar certificados'], commands: ['bash run.sh'], expected: ['Relatório de protocolos e cipher'], links: { play: 'plays/play-15-ssl-tls-health-check/index.html', home: 'index.html' } },
  '16': { title: 'Por Dentro do Play 16 — Docker Vulnerability Scan', description: 'Escaneamento de imagens Docker para CVEs.', objectives: ['Checar vulnerabilidades em imagens'], commands: ['bash run.sh'], expected: ['Relatório de riscos'], links: { play: 'plays/play-16-docker-vulnerability-scan/index.html', home: 'index.html' } },
  '17': { title: 'Por Dentro do Play 17 — Kubernetes Config Audit', description: 'Auditoria de configurações Kubernetes.', objectives: ['Validar políticas de segurança'], commands: ['bash run.sh'], expected: ['Relatório de falhas'], links: { play: 'plays/play-17-kubernetes-config-audit/index.html', home: 'index.html' } },
  '18': { title: 'Por Dentro do Play 18 — OWASP ZAP Scan', description: 'Scanner automatizado OWASP ZAP para web.', objectives: ['Detectar vulnerabilidades comuns'], commands: ['./run.sh'], expected: ['Relatório de riscos OWASP Top10'], links: { play: 'plays/play-18-owasp-zap-automated-scan/index.html', home: 'index.html' } },
  '19': { title: 'Por Dentro do Play 19 — Static Analysis Bandit', description: 'Análise estática de código Python com Bandit.', objectives: ['Encontrar falhas de segurança em código'], commands: ['bandit -r .'], expected: ['Relatório de issues'], links: { play: 'plays/play-19-static-analysis-python-bandit/index.html', home: 'index.html' } },
  '20': { title: 'Por Dentro do Play 20 — IaC Security Terraform', description: 'Auditoria de Terraform usando tfsec.', objectives: ['Detectar problemas em IaC'], commands: ['tfsec .'], expected: ['Relatório de inseguranças'], links: { play: 'plays/play-20-iac-security-audit-terraform/index.html', home: 'index.html' } },
  '21': { title: 'Por Dentro do Play 21 — JWT Pen Test', description: 'Testes de segurança de tokens JWT.', objectives: ['Validar assinaturas'], commands: ['./run.sh'], expected: ['Falhas de assinatura'], links: { play: 'plays/play-21-jwt-token-penetration-test/index.html', home: 'index.html' } },
  '22': { title: 'Por Dentro do Play 22 — Dependency Supply Chain', description: 'Auditoria de supply chain de dependências.', objectives: ['Verificar proveniência de pacotes'], commands: ['./run.sh'], expected: ['Alertas de supply chain'], links: { play: 'plays/play-22-dependency-supply-chain-check/index.html', home: 'index.html' } },
};

// === Função de abertura do modal “Por Dentro” ========
function openModalPorDentro(id) {
  const post = playPosts[id];
  if (!post) return console.error('Post não encontrado:', id);

  document.querySelector('#modal-por-dentro h1').textContent = post.title;
  document.querySelector('#modal-por-dentro .modal-desc').textContent = post.description;

  const ulObj = document.querySelector('#modal-por-dentro .modal-objectives');
  ulObj.innerHTML = '';
  post.objectives.forEach(o => ulObj.appendChild(Object.assign(document.createElement('li'), { textContent: o })));

  const ulCmd = document.querySelector('#modal-por-dentro .modal-commands');
  ulCmd.innerHTML = '';
  post.commands.forEach(c => ulCmd.appendChild(Object.assign(document.createElement('li'), { textContent: c })));

  const ulExp = document.querySelector('#modal-por-dentro .modal-expected');
  ulExp.innerHTML = '';
  post.expected.forEach(r => ulExp.appendChild(Object.assign(document.createElement('li'), { textContent: r })));

  document.querySelector('#modal-por-dentro .btn-play').href = post.links.play;
  document.querySelector('#modal-por-dentro .btn-home').href = post.links.home;

  document.getElementById('modal-por-dentro').classList.add('open');
}

// === Fecha o modal ===================================
document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('modal-por-dentro').classList.remove('open');
}));

// === Liga os botões “Por Dentro” ===================
document.querySelectorAll('.btn-por-dentro').forEach(btn => btn.addEventListener('click', e => {
  e.preventDefault();
  openModalPorDentro(btn.getAttribute('data-play-id'));
}));
