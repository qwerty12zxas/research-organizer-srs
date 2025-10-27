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
document.getElementById('filterStatus').addEventListener('change', renderList);

function labelStatus(s){ return s==='read'?'Прочитано':s==='reading'?'В процессе':'Непрочитано'; }

function toggleStatus(li){
  const badge = li.querySelector('.badge');
  const next = badge?.dataset.status==='unread' ? 'reading' :
               badge?.dataset.status==='reading' ? 'read' : 'unread';
  badge.dataset.status = next;
  badge.className = `badge ${next}`;
  badge.textContent = labelStatus(next);
}

function renderList(){
  const list = document.getElementById('articleList');
  const q   = (document.getElementById('q')?.value || '').toLowerCase();
  const cat = (document.getElementById('filterCategory')?.value || '').toLowerCase();
  const st  = (document.getElementById('filterStatus')?.value || '');

  [...list.querySelectorAll('li')].forEach(li => {
    const text = li.innerText.toLowerCase();
    const badge = li.querySelector('.badge');
    const sOK = !st || badge?.dataset.status === st;
    const qOK = !q  || text.includes(q);
    const cOK = !cat|| text.includes(cat);
    li.style.display = (sOK && qOK && cOK) ? '' : 'none';
  });
}

const oldAdd = addArticle;
addArticle = function(){
  const input = document.getElementById('articleInput');
  const title = (input.value || '').trim();
  if (!title){ alert('Введите название статьи!'); return; }

  const li = document.createElement('li');
  li.innerHTML = `
    <span>
      ${title}
      <span class="badge unread" data-status="unread">${labelStatus('unread')}</span>
    </span>
    <span>
      <button onclick="toggleStatus(this.closest('li'))">Статус</button>
      <button onclick="this.closest('li').remove()">Удалить</button>
    </span>
  `;
  document.getElementById('articleList').appendChild(li);
  input.value = ''; input.focus();
  renderList();
};

