/* konami.js – Easter‑egg com opt‑in por palavra‑chave */

(() => {
  const secretKey = '01092024';          // palavra‑chave que desbloqueia o easter‑egg
  const audioSrc  = 'assets/easter/palpite.mp3';   // trilha
  const imgSrc    = 'assets/easter/foto-casal1.jpg';// foto secreta
  const imgSrc    = 'assets/easter/foto-casal2.jpg';// foto secreta2

  /* --- detector de Konami Code --- */
  let buffer = [];
  const pattern = [38,38,40,40,37,39,37,39,66,65]; // ↑ ↑ ↓ ↓ ← → ← → B A

  window.addEventListener('keydown', ev => {
    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    if (pattern.every((v,i)=>v===buffer[i])) {
      buffer = [];                 // reseta
      solicitarSenha();
    }
  });

  /* --- modal para digitar a senha --- */
  function solicitarSenha(){
    const modal = document.getElementById('easter-modal');
    modal.classList.remove('hidden');

    const btn = document.getElementById('easter-submit');
    const input = document.getElementById('easter-key');
    const erro = document.getElementById('easter-erro');

    btn.onclick = () => {
      if (input.value.trim().toLowerCase() === secretKey){
        modal.classList.add('hidden');
        ativarEasterEgg();
      } else {
        erro.textContent = 'Senha incorreta 😅';
        erro.classList.remove('hidden');
      }
    };
  }

  /* --- mostra foto + música --- */
  function ativarEasterEgg(){
    // imagem
    const img = new Image();
    img.src = imgSrc;
    img.className = 'easter-img';
    document.body.appendChild(img);

    // áudio
    const audio = new Audio(audioSrc);
    audio.volume = 0.7;
    audio.play();

    // clique esconde tudo
    img.addEventListener('click', () => {
      audio.pause();
      img.remove();
    });
  }
})();
