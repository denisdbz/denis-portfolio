#!/usr/bin/env python3
import json, os

with open('plays.json', encoding='utf-8') as f:
    plays = json.load(f)

template = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{title}</title>
  <link rel="stylesheet" href="../../style.css"/>
</head>
<body class="neon-dark">

  <nav class="navbar">
    <ul>
      <li><a href="../../index.html">Home</a></li>
      <li><a href="../../sobre.html">Sobre</a></li>
      <li><a href="../../news.html">News</a></li>
    </ul>
  </nav>

  <header class="hero">
    <div class="logo-box">
      <img src="../../assets/img/logo-animado-denis.png" alt="Logo" class="logo-animado"/>
      <span class="logo-text">{title}</span>
    </div>
  </header>

  <main class="container">
    <h1>{title}</h1>
    <p class="intro">{intro}</p>
  </main>

  <script src="../../scripts.js"></script>
  <script src="../../simulate-run.js"></script>
  <script src="../../assets/play-loader.js"></script>
</body>
</html>
'''

for play in plays:
    slug = play['slug']
    out_dir = os.path.join('plays', slug)
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'index.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(template.format(title=play['title'], intro=play['intro']))
    print(f'Gerado: {out_path}')
