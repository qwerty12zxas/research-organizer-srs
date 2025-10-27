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
  input.value = ''; input.focus();
}
