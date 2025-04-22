function executarTeste(playId){
  fetch(`/api/exec/${playId}`, { method: 'POST' })
    .then(r => r.json())
    .then(data => {
      const out = document.getElementById('resultado');
      if (data.stdout) out.textContent = data.stdout;
      else if (data.mensagem) out.textContent = data.mensagem;
      else out.textContent = `Erro: ${data.erro || 'falha ao executar'}`;
    })
    .catch(err=>{
      document.getElementById('resultado').textContent = `Erro de rede: ${err}`;
    });
}
