# 💥 Pentest Play 03: SQL Injection com SQLMap no DVWA

Este play executa um ataque automatizado de SQL Injection usando o SQLMap contra a aplicação DVWA (Damn Vulnerable Web Application).

## 🔧 Como usar

1. Suba os containers:

```bash
docker-compose up -d
```

2. Execute o ataque:

```bash
chmod +x run-attack.sh
./run-attack.sh
```

3. Gere o relatório (opcional):

```bash
chmod +x gera-relatorio.sh
./gera-relatorio.sh
```

4. Veja o resultado em `report.html`.

## 🎥 Demonstração

![Ataque com SQLMap](sqlmap-dvwa.gif)

---

🛑 Este projeto é apenas para fins educacionais. Não use esse tipo de ferramenta fora de ambientes controlados!
