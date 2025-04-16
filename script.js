function mostrarLoading() {
  document.getElementById('loading').classList.remove('hidden');
}

function esconderLoading() {
  document.getElementById('loading').classList.add('hidden');
}

function executarPlay(numero) {
  const relatorio = document.getElementById(`relatorio-play-${numero}`);
  mostrarLoading();

  setTimeout(() => {
    esconderLoading();
    relatorio.innerHTML = `<iframe src="plays/play-0${numero}-*/relatorio.html" width="100%" height="400px" style="border: none;"></iframe>`;
    relatorio.style.display = 'block';
  }, 2000);
}

function executarTodos() {
  const relatorioTodos = document.getElementById('relatorio-todos');
  mostrarLoading();

  setTimeout(() => {
    esconderLoading();
    relatorioTodos.innerHTML = `<iframe src="relatorios/relatorio-todos.html" width="100%" height="400px" style="border: none;"></iframe>`;
    relatorioTodos.style.display = 'block';
  }, 2500);
}
