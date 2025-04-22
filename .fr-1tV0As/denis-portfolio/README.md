# Portfólio Técnico — Denis

Este projeto é um portfólio técnico interativo com execução real de testes de segurança e qualidade.

## ✅ O que está incluído

- Testes automatizados reais (Nmap, SQLMap, Hydra, etc)
- Geração de relatórios HTML por play
- Botões que executam os testes e mostram os relatórios
- Visual estilo Matrix e explicações leigas para cada teste

## 🚀 Como rodar localmente

```bash
pip install flask
python app.py
```

Acesse no navegador:
```
http://localhost:5000
```

## ☁️ Como hospedar no Railway

1. Suba esse repositório no GitHub
2. Acesse https://railway.app
3. Crie um projeto → Deploy from GitHub → Escolha este repositório
4. Railway detectará o `Procfile` e criará a URL pública

## 🧪 Executar todos os testes de uma vez

```bash
./executar_todos_os_tests.sh
```
