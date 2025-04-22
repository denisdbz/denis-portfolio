# 💼 Denis Oliveira — Portfólio Profissional de QA & Pentest

Seja muito bem-vindo ao meu portfólio técnico! Este projeto reúne **plays reais**, executáveis diretamente do navegador, demonstrando minha atuação em **Qualidade de Software**, **Testes Automatizados**, **Pentest**, **CI/CD** e **DevSecOps**.

## 🔍 Sobre o Projeto

Este portfólio foi desenvolvido com foco em acessibilidade, clareza técnica e praticidade para o avaliador. Os testes aqui não são fictícios: **são scripts reais que interagem com ambientes configurados para cada situação**, e exibem os resultados dinamicamente na tela. Hospedado no GitHub Pages, com backend em Flask na Railway.

---

## 🧪 Estrutura dos Plays

Cada *play* representa um cenário real de teste ou pentest. Eles estão organizados da seguinte forma:

| Play | Nome                            | Descrição |
|------|----------------------------------|-----------|
| 01   | Nmap Recon                       | Varredura de portas e serviços |
| 02   | Hydra em DVWA                   | Força-bruta em login |
| 03   | SQLMap em DVWA                  | SQL Injection automatizada |
| 04   | Carga com JMeter                | Simulação de carga |
| 05   | Avaliação QA Automatizada       | Testes de API REST simulando processo real |
| 06   | Carga com Bash Script           | Stress test shell |
| 07   | Testes Mobile com Appium        | Automação mobile Android |

---

## 🚀 Execução dos Testes

Os testes são acionados por botões visíveis no site. O botão "▶️ Executar Teste" dispara um request para a API Flask (Railway), que roda o script correspondente e retorna o resultado **em tempo real**.

```bash
POST /api/exec/play-01-nmap-recon
```

A resposta (output, erro, status) é exibida na tela.

---

## 📂 Estrutura

```
denis-portfolio/
├── app.py
├── index.html
├── style.css
├── simulate-run.js
├── plays/
│   ├── play-01-nmap-recon/
│   ├── play-02-hydra-dvwa/
│   └── ...
├── assets/
│   └── img/ (imagens de evidência)
```

---

## ⚙️ Tecnologias Usadas

- **Flask** (API backend)
- **Shell Script**
- **JMeter**
- **Appium**
- **HTML/CSS/JS Vanilla**
- **GitHub Pages** + **Railway**
- **CI/CD via GitHub Actions**

---

## 🧾 Como Rodar Localmente

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Acesse: [http://127.0.0.1:5000/play/play-01-nmap-recon](http://127.0.0.1:5000/play/play-01-nmap-recon)

---

## 💬 Contato

- 🔗 [LinkedIn](https://www.linkedin.com/in/denis-oliveira-santos-99a83953/)
- 📬 Email: denis.qae.hack@gmail.com
- 💬 WhatsApp: 11 97811‑8097
- 🐙 [GitHub](https://github.com/denisdbz)

---

**© 2025 - Denis Oliveira. Todos os direitos reservados.**