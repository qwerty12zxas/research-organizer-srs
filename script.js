function addArticle(){
  const input = document.getElementById('articleInput');
  const title = (input.value || '').trim();

  if (!title){ alert('Введите название статьи!'); return; }

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${title}</span>
    <button onclick="this.parentElement.remove()">Удалить</button>
  `;
  document.getElementById('articleList').appendChild(li);

  input.value = '';
  input.focus();
}
const el = (id)=>document.getElementById(id);
el('q').addEventListener('input', renderList);
el('filterCategory').addEventListener('input', renderList);
el('resetFilters').addEventListener('click', ()=>{ el('q').value=''; el('filterCategory').value=''; renderList(); });

function renderList(){
  const list = document.getElementById('articleList');
  const q   = (el('q')?.value || '').toLowerCase();
  const cat = (el('filterCategory')?.value || '').toLowerCase();

  const items = [...list.querySelectorAll('li')];

  items.forEach(li => li.style.display = ''); // сброс

  items.forEach(li => {
    const text = li.innerText.toLowerCase();
    const byQ  = !q   || text.includes(q);
    const byC  = !cat || text.includes(cat);
    if(!(byQ && byC)) li.style.display = 'none';
  });
}
