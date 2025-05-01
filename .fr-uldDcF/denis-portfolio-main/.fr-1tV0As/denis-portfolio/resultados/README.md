# Denis Portfolio – Testes Automatizados 🧪🚀

Este projeto apresenta uma coleção de testes automatizados executáveis tanto localmente quanto via navegador, com interface amigável e acessível.

## 🔧 Requisitos

Antes de rodar os testes, certifique-se de ter:

- **Python 3.11+**
- **Node.js (versão 18 ou superior)**
- **Flask** (`pip install flask`)
- **JMeter** (baixado e configurado no PATH)

## ▶️ Como rodar localmente

1. Clone o projeto:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. Instale dependências do Node:
   ```bash
   npm install
   ```

3. Inicie o servidor Flask:
   ```bash
   python app.py
   ```

4. Acesse no navegador:
   ```
   http://localhost:5000
   ```

## 🌐 Deploy na Railway

1. Vá até [https://railway.app](https://railway.app) e conecte este repositório.
2. Railway detectará o `app.py` e instalará automaticamente Python/Flask.
3. Certifique-se de que o `railway.json` está incluído no projeto (já está neste pacote 😉).

## 📂 Estrutura do Projeto

```bash
📁 plays/
├── play01-nmap/
├── play02-sqlmap/
├── play03-wpscan/
├── play04-jmeter/     ← Novo teste baseado em JMeter
...
```

## 🧠 Dica

Os testes também podem ser executados diretamente pelo navegador com apenas 1 clique no botão **Executar Teste**, em cada Play.

---

Feito com ❤️ por Denis.
