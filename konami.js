/* konami.js – Easter‑egg com opt‑in por palavra‑chave */

(() => {
  const secretKey = '01092024';          // palavra‑chave que desbloqueia o easter‑egg
  const audioSrc  = 'assets/easter/palpite.mp3';   // trilha
  const fotos = [                        // Lista de fotos a serem exibidas
    'assets/easter/foto1.jpg', 
    'assets/easter/foto2.jpg'
  ];

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

  /* --- mostra fotos + música --- */
  function ativarEasterEgg(){
    const gallery = document.createElement('div');
    gallery.className = 'easter-gallery';
    
    // Exibe todas as fotos
    fotos.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'easter-img';
      gallery.appendChild(img);
    });

    document.body.appendChild(gallery);

    // áudio
    const audio = new Audio(audioSrc);
    audio.volume = 0.7;
    audio.play();

    // clique esconde tudo
    gallery.addEventListener('click', () => {
      audio.pause();
      gallery.remove();
    });
  }
})();
