// Scripts principais do Portfólio Denis Oliveira

window.addEventListener('DOMContentLoaded', function() {

  // Botão Sobre
  document.getElementById('btn-sobre')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('modal-sobre').classList.remove('hidden');
  });

  // Botão Ajuda
  document.getElementById('btn-ajuda')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('modal-ajuda').classList.remove('hidden');
  });

  // Fechar Sobre
  document.getElementById('close-sobre')?.addEventListener('click', () => {
    document.getElementById('modal-sobre').classList.add('hidden');
  });

  // Fechar Ajuda
  document.getElementById('close-ajuda')?.addEventListener('click', () => {
    document.getElementById('modal-ajuda').classList.add('hidden');
  });

  // Botões "Por Dentro" para abrir o Play
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const play = btn.dataset.play;
      document.getElementById('conteudo-por-dentro').innerHTML = `<p>Documentação detalhada do Play ${play} em breve.</p>`;
      document.getElementById('modal-por-dentro').classList.remove('hidden');
    });
  });

  // Fechar Por Dentro
  document.getElementById('close-por-dentro')?.addEventListener('click', () => {
    document.getElementById('modal-por-dentro').classList.add('hidden');
  });

  // Busca de Plays
  document.getElementById('search-input')?.addEventListener('input', function() {
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

  // Dark/Light Mode Toggle
  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // Botão News
  document.getElementById('btn-news')?.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = "news.html";
  });

  // Botão Easter Egg Mobile
  document.getElementById('mobile-easter-btn')?.addEventListener('click', solicitarSenha);

});

// Função para Easter Egg
function solicitarSenha() {
  const senha = prompt("Digite a senha secreta:");
  if (senha === "konami") {
    alert("Parabéns! Você desbloqueou um segredo!");
    document.getElementById('easter-gallery').classList.remove('hidden');
    // Aqui poderia carregar imagens secretas ou outra interação!
  } else {
    alert("Senha incorreta!");
  }
}