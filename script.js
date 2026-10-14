const backdrop = document.getElementById('modalBackdrop');
const title = document.getElementById('modalTitle');
const content = document.getElementById('modalContent');

function openModal(name, html) {
  title.textContent = name;
  content.innerHTML = html;
  backdrop.classList.remove('hidden');
}
function closeModal() { backdrop.classList.add('hidden'); }

document.getElementById('modalClose').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('loginBtn').addEventListener('click', () => {
  openModal('Entrar', `
    <p>Entre para salvar seu progresso e acompanhar seus jogos.</p>
    <form id="loginForm">
      <label for="email">E-mail</label><input id="email" type="email" placeholder="voce@exemplo.com" required>
      <label for="password">Senha</label><input id="password" type="password" placeholder="Sua senha" required>
      <button class="btn primary" type="submit">Continuar</button>
    </form>`);
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    openModal('Demonstração', '<p>Esta é uma recriação visual local. O login real precisa ser conectado a um backend.</p>');
  });
});
document.getElementById('adsBtn').addEventListener('click', () => {
  openModal('Remover anúncios', '<p>Jogue sem anúncios com uma assinatura. Esta versão demonstrativa não processa pagamentos.</p><button class="btn primary" id="plansBtn">Ver planos</button>');
  document.getElementById('plansBtn').addEventListener('click', () => openModal('Planos', '<p>Área demonstrativa de planos — conecte aqui seu sistema de pagamentos para ativar compras.</p>'));
});
document.getElementById('playBtn').addEventListener('click', () => {
  openModal('Jogo diário', `
    <p>Encontre quatro grupos de palavras que tenham algo em comum.</p>
    <div class="demo-words" id="demoWords">
      ${['MAÇÃ','BANANA','UVA','PERA','AZUL','VERDE','ROXO','AMARELO','CÃO','GATO','CAVALO','COELHO','JANEIRO','MARÇO','JUNHO','OUTUBRO'].map(w => `<button class="btn outline word">${w}</button>`).join('')}
    </div>
    <p id="wordCount">0 palavras selecionadas</p>
    <button class="btn primary" id="checkWords">Conferir seleção</button>
    <style>.demo-words{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.word{padding:8px 2px;height:auto;font-size:10px}.word.chosen{background:#3298f5;border-color:#3298f5}</style>`);
  const selected = new Set();
  document.querySelectorAll('.word').forEach(btn => btn.addEventListener('click', () => {
    const w = btn.textContent;
    if (selected.has(w)) { selected.delete(w); btn.classList.remove('chosen'); }
    else if (selected.size < 4) { selected.add(w); btn.classList.add('chosen'); }
    document.getElementById('wordCount').textContent = `${selected.size} palavra(s) selecionada(s)`;
  }));
  document.getElementById('checkWords').addEventListener('click', () => {
    const groups = [
      ['MAÇÃ','BANANA','UVA','PERA'], ['AZUL','VERDE','ROXO','AMARELO'],
      ['CÃO','GATO','CAVALO','COELHO'], ['JANEIRO','MARÇO','JUNHO','OUTUBRO']
    ];
    const found = groups.some(g => g.every(w => selected.has(w)) && selected.size === 4);
    openModal(found ? 'Grupo encontrado!' : 'Tente novamente', found ? '<p>Boa! Você encontrou um grupo. Este protótipo demonstra a interação do jogo.</p>' : '<p>Essas palavras não formam um grupo. Selecione quatro palavras relacionadas e tente novamente.</p>');
  });
});
document.getElementById('archiveBtn').addEventListener('click', () => {
  openModal('Jogos anteriores', '<p>Escolha uma data para rever um desafio anterior.</p><label for="pastDate">Data do jogo</label><input id="pastDate" type="date" value="2026-10-13"><button class="btn primary" id="openPast">Abrir jogo</button>');
  document.getElementById('openPast').addEventListener('click', () => openModal('Jogo anterior', '<p>O arquivo de jogos é demonstrativo nesta versão local.</p>'));
});
document.getElementById('storeBtn').addEventListener('click', () => openModal('Daydash Store', '<p>Personalize sua experiência com itens e temas do jogo. A loja real depende dos serviços originais do site.</p>'));

document.querySelectorAll('[data-panel]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();
  const panel = el.dataset.panel;
  const panels = {
    'Idioma': '<p>Selecione o idioma da interface.</p><label for="language">Idioma</label><select id="language"><option>Português (Brasil)</option><option>English</option><option>Español</option></select><button class="btn primary" id="savePanel">Salvar</button>',
    'Tema': '<p>Escolha a aparência.</p><label for="themeSelect">Tema</label><select id="themeSelect"><option value="dark">Escuro</option><option value="light">Claro</option></select><button class="btn primary" id="savePanel">Aplicar tema</button>',
    'Feedback': '<p>Conte o que podemos melhorar.</p><label for="feedbackText">Mensagem</label><textarea id="feedbackText" rows="4" placeholder="Escreva seu feedback..."></textarea><button class="btn primary" id="savePanel">Enviar feedback</button>'
  };
  openModal(panel, panels[panel] || `<p>Esta seção é um espaço demonstrativo para “${panel}”. Substitua pelo conteúdo oficial se você tiver autorização e os textos necessários.</p>`);
  const save = document.getElementById('savePanel');
  if (save) save.addEventListener('click', () => {
    if (panel === 'Tema') {
      const light = document.getElementById('themeSelect').value === 'light';
      document.documentElement.style.setProperty('--bg', light ? '#f1f3f8' : '#111528');
      document.documentElement.style.setProperty('--text', light ? '#161b2c' : '#f7f8fc');
      document.documentElement.style.setProperty('--panel', light ? '#fff' : '#121729');
      openModal('Tema atualizado', '<p>A aparência foi alterada nesta página.</p>');
    } else {
      openModal('Obrigado!', '<p>Sua ação foi registrada apenas nesta demonstração local.</p>');
    }
  });
}));
