function addArticle() {
  const input = document.getElementById('articleTitle');
  const title = input.value.trim();
  if (title === '') return alert('Введите название статьи!');
  const list = document.getElementById('articleList');
  const li = document.createElement('li');
  li.textContent = title;
  list.appendChild(li);
  input.value = '';
}
