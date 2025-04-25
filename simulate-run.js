
// simulate-run.js (raiz)
async function executarTeste(playId) {
  const btn = document.querySelector(`button[data-play="${playId}"]`) || document.querySelector(`button[onclick*="${playId}"]`);
  const bar = document.getElementById('barra');
  const fill = document.getElementById('barra-fill');
  const logs = document.getElementById('logs');

  btn.disabled = true;
  btn.textContent = '⏳ Iniciando…';
  bar.classList.remove('hidden');
  fill.style.width = '0%';
  logs.textContent = '';

  try {
    const resp = await fetch('https://web-production-c891.up.railway.app/executar', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({play: playId})
    });

    if(!resp.ok) throw new Error('HTTP '+resp.status);

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let received=0, total=resp.headers.get('Content-Length')||0;
    let buffer='';
    btn.textContent='▶️ Executando…';

    while(true){
      const {done, value}=await reader.read();
      if(done) break;
      buffer += decoder.decode(value, {stream:true});
      logs.textContent = buffer;
      received += value.length;
      if(total){
        fill.style.width = Math.floor(received/total*100)+'%';
      }
    }
    fill.style.width='100%';
    btn.textContent='✅ Concluído';
  } catch(e){
    logs.textContent='❌ '+e.message;
    btn.textContent='⚠️ Erro';
  } finally{
    btn.disabled=false;
  }
}
