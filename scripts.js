window.addEventListener('DOMContentLoaded', function() {
  // SOBRE
  const btnSobre = document.getElementById('btn-sobre');
  const modalSobre = document.getElementById('modal-sobre');
  const closeSobre = document.getElementById('close-sobre');

  if (btnSobre && modalSobre && closeSobre) {
    btnSobre.addEventListener('click', e => {
      e.preventDefault();
      modalSobre.classList.remove('hidden');
    });

    closeSobre.addEventListener('click', () => {
      modalSobre.classList.add('hidden');
    });
  }

  // AJUDA
  const btnAjuda = document.getElementById('btn-ajuda');
  const modalAjuda = document.getElementById('modal-ajuda');
  const closeAjuda = document.getElementById('close-ajuda');

  if (btnAjuda && modalAjuda && closeAjuda) {
    btnAjuda.addEventListener('click', e => {
      e.preventDefault();
      modalAjuda.classList.remove('hidden');
    });

    closeAjuda.addEventListener('click', () => {
      modalAjuda.classList.add('hidden');
    });
  }

  // POR DENTRO
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const play = btn.dataset.play;
      document.getElementById('conteudo-por-dentro').textContent = `Documentação resumida do Play ${play}.`;
      document.getElementById('modal-por-dentro').classList.remove('hidden');
    });
  });

  const closePorDentro = document.getElementById('close-por-dentro');
  if (closePorDentro) {
    closePorDentro.addEventListener('click', () => {
      document.getElementById('modal-por-dentro').classList.add('hidden');
    });
  }

  // EASTER EGG BOTÃO MOBILE
  const btnEasterMobile = document.getElementById('mobile-easter-btn');
  if (btnEasterMobile) {
    btnEasterMobile.addEventListener('click', solicitarSenha);
  }

  // Botão News redireciona
  const btnNews = document.getElementById('btn-news');
  if (btnNews) {
    btnNews.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = "news.html";
    });
  }

  // Tema Dark/Light
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }

  // Sistema de Busca nos Plays
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const filter = this.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});

// Função para solicitar senha do Easter Egg
function solicitarSenha() {
  const easterModal = document.getElementById('easter-modal');
  easterModal.style.display = 'flex';

  document.getElementById('easter-submit').onclick = function() {
    const senha = document.getElementById('easter-key').value.trim();
    if (senha === "unicorn") {
      document.getElementById('easter-gallery').classList.remove('hidden');
      easterModal.style.display = 'none';
      alert('Easter Egg desbloqueado!');
    } else {
      const erro = document.getElementById('easter-erro');
      erro.textContent = "Senha incorreta. Tente novamente.";
      erro.classList.remove('hidden');
    }
  };
}
