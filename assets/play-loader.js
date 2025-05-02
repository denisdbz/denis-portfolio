// assets/play-loader.js

document.addEventListener('DOMContentLoaded', async () => {
  // só roda em páginas /plays/play-XX-*/
  if (!location.pathname.includes('/plays/play-')) return;

  // carrega o template
  const tplText = await fetch('../../assets/play-template.html').then(r => r.text());
  const tplDoc  = new DOMParser().parseFromString(tplText, 'text/html');
  const tpl     = tplDoc.getElementById('play-tpl');
  const frag    = tpl.content.cloneNode(true);

  // injeta no container principal
  const main = document.querySelector('main.container');
  main.appendChild(frag);

  // põe título e intro
  const title = document.querySelector('header .logo-text')?.textContent || '';
  const intro = document.querySelector('main .intro')?.textContent    || '';
  document.getElementById('play-title').textContent = title;
  document.getElementById('play-intro').textContent = intro;

  // pega o ID (XX) do URL
  const m = location.pathname.match(/play-(\d{2})/);
  const id = m ? m[1] : '';

  // associa botões
  document.getElementById('btn-exec')
    .addEventListener('click', () => executarTeste(`play-${id}`));
});
