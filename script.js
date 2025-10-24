function addArticle() {
  const articleInput = document.getElementById('articleTitle');
  const title = articleInput.value.trim();

  if (title === '') {
    alert('Введите название статьи!');
    return;
  }

  const list = document.getElementById('articleList');
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${title}</span>
    <button onclick="this.parentElement.remove()">Удалить</button>
  `;

  list.appendChild(li);
  articleInput.value = '';
  articleInput.focus();
}
