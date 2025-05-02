/* konami.js – Easter-egg via Konami Code, modal de senha e exibição de um único vídeo */
(() => {
  // ================== CONFIGURAÇÃO ==================
  const secretKey = '01092024';                                // senha secreta
  const videoSrc  = 'assets/easter/2025-05-02.mp4';   // seu vídeo

  // sequência do Konami Code (↑↑↓↓←→←→BA)
  const pattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let buffer = [];
  let iniciado = false;
  let audio;

  // Captura teclas para detectar a sequência
  function onKeyDown(ev) {
    if (ev.key === 'Escape') fecharTudo();

    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    if (pattern.every((v, i) => v === buffer[i])) {
      buffer = [];
      solicitarSenha();
    }
  }

  // Abre modal de senha
  function solicitarSenha() {
    const modal = document.getElementById('easter-modal');
    const btn   = document.getElementById('easter-submit');
    const input = document.getElementById('easter-key');
    const erro  = document.getElementById('easter-erro');

    erro.classList.add('hidden');
    input.value = '';
    modal.classList.remove('hidden');
    input.focus();

    // remove listeners antigos e adiciona novo handler
    const novoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(novoBtn, btn);
    novoBtn.addEventListener('click', () => {
      if (input.value.trim() === secretKey) {
        modal.classList.add('hidden');
        abrirVideo();
      } else {
        erro.classList.remove('hidden');
      }
    });
  }

  // Exibe o vídeo e toca o áudio de fundo
  function abrirVideo() {
    const galeria = document.getElementById('easter-gallery');

    if (!iniciado) {
      galeria.innerHTML = '';

      // cria elemento <video>
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.style.objectFit = 'contain';   // mantém proporção
      video.style.maxWidth = '90vw';
      video.style.maxHeight = '90vh';
      galeria.appendChild(video);

      iniciado = true;
    }

    // toca áudio em loop
    if (audio) audio.pause();
    audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play();

    galeria.classList.remove('hidden');
  }

  // Fecha tanto o modal de senha quanto o player de vídeo
  function fecharTudo() {
    const modal   = document.getElementById('easter-modal');
    const galeria = document.getElementById('easter-gallery');

    if (modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
    if (galeria && !galeria.classList.contains('hidden')) {
      galeria.classList.add('hidden');
    }
    if (audio) {
      audio.pause();
      audio = null;
    }
  }

  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('keydown', onKeyDown);

    // botão “×” do modal de senha
    document.querySelectorAll('#easter-modal .close-modal')
      .forEach(btn => btn.addEventListener('click', fecharTudo));

    // clique fora do vídeo fecha
    document.getElementById('easter-gallery')
      .addEventListener('click', fecharTudo);
  });
})();
