// konami.js
(() => {
  // ================== CONFIGURAÇÃO ==================
  const secretKey = '01092024';                   // senha
  const videoSrc   = 'assets/easter/2025-05-02.mp4'; // seu vídeo

  // ==================== KONAMI ======================
  const pattern = [38,38,40,40,37,39,37,39,66,65]; // ↑ ↑ ↓ ↓ ← → ← → B A
  let buffer = [];

  window.addEventListener('keydown', ev => {
    // Esc fecha o egg se aberto
    if (ev.key === 'Escape') ocultarEasterEgg();

    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    if (pattern.every((v, i) => v === buffer[i])) {
      buffer = [];
      solicitarSenha();
    }
  });

  // ==================== MODAL =======================
  function solicitarSenha() {
    const modal = document.getElementById('easter-modal');
    const btn   = document.getElementById('easter-submit');
    const input = document.getElementById('easter-key');
    const erro  = document.getElementById('easter-erro');

    erro.classList.add('hidden');
    input.value = '';
    modal.classList.remove('hidden');
    input.focus();

    btn.onclick = () => {
      if (input.value.trim() === secretKey) {
        modal.classList.add('hidden');
        ativarEasterEgg();
      } else {
        erro.textContent = 'Senha incorreta 😅';
        erro.classList.remove('hidden');
      }
    };
  }

  // ==================== EASTER ======================
  let painelCriado = false;
  let videoElem;

  function ativarEasterEgg() {
    const gallery = document.getElementById('easter-gallery');

    if (!painelCriado) {
      // container full-screen
      gallery.className =
        'fixed inset-0 z-50 flex items-center justify-center bg-black/75';
      gallery.style.cursor = 'pointer';

      // cria o <video>
      videoElem = document.createElement('video');
      videoElem.src         = videoSrc;
      videoElem.controls    = true;
      videoElem.autoplay    = true;
      videoElem.loop        = true;
      videoElem.style.maxWidth  = '80vw';
      videoElem.style.maxHeight = '80vh';
      videoElem.style.objectFit = 'contain';
      videoElem.style.border    = '4px solid var(--neon-color)';
      videoElem.style.boxShadow  = '0 0 20px var(--neon-color)';
      videoElem.style.borderRadius = '8px';

      gallery.appendChild(videoElem);
      painelCriado = true;
    }

    gallery.classList.remove('hidden');
    videoElem.play();
    gallery.onclick = ocultarEasterEgg;
  }

  function ocultarEasterEgg() {
    const gallery = document.getElementById('easter-gallery');
    if (!gallery.classList.contains('hidden')) {
      gallery.classList.add('hidden');
      if (videoElem) videoElem.pause();
    }
  }

  // expose to global (se quiser chamar manualmente)
  window.solicitarSenha = solicitarSenha;

})();
