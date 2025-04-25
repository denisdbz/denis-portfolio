
// konami-easter.js
(function(){
  const secret = [38,38,40,40,37,39,37,39,66,65]; // ↑ ↑ ↓ ↓ ← → ← → B A
  let pos = 0;
  document.addEventListener('keydown', e=>{
    if(e.keyCode === secret[pos]){
      pos++;
      if(pos===secret.length){
        pos=0;
        triggerEasterEgg();
      }
    } else {
      pos = 0;
    }
  });
  function triggerEasterEgg(){
    // create modal
    const modal = document.createElement('div');
    modal.id='love-modal';
    modal.style.position='fixed';
    modal.style.inset='0';
    modal.style.background='rgba(0,0,0,0.9)';
    modal.style.display='flex';
    modal.style.flexDirection='column';
    modal.style.alignItems='center';
    modal.style.justifyContent='center';
    modal.style.zIndex='9999';
    modal.innerHTML = `
      <h2 style="color:#0f0;font-family:Courier New,monospace;margin-bottom:1rem;">Para a mulher da minha vida 💚</h2>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;max-width:90vw;">
        <img src="assets/img/foto1.jpg" style="max-width:300px;border:2px solid #0f0;border-radius:10px;">
        <img src="assets/img/foto2.jpg" style="max-width:300px;border:2px solid #0f0;border-radius:10px;">
      </div>
      <p style="color:#0f0;margin:1rem 0;font-family:Courier New,monospace;">Cada teste, cada linha de código, cada batida do meu coração é por você.</p>
      <button id="close-egg" style="padding:0.5rem 1rem;background:#0f0;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Fechar</button>
    `;
    document.body.appendChild(modal);
    const audio = new Audio('assets/audio/palpite.mp3');
    audio.volume = 0.5;
    audio.play();
    document.getElementById('close-egg').onclick=()=>{
      audio.pause();
      audio.currentTime=0;
      modal.remove();
    };
  }
})();
