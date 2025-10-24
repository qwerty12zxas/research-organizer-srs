let articles = [];
const $ = id => document.getElementById(id);
const toTags = s => (s || "").split(",").map(t => t.trim()).filter(Boolean);

function renderList() {
  const list = $("articlesList");
  const q = $("q").value.toLowerCase();
  const cat = $("filterCategory").value.toLowerCase();
  const status = $("filterStatus").value;
  list.innerHTML = "";
  articles.filter(a => {
    const text = [a.title,a.authors,a.tags.join(" ")].join(" ").toLowerCase();
    return (!q || text.includes(q)) && (!cat || a.category.toLowerCase().includes(cat)) && (!status || a.status===status);
  }).forEach(a => {
    const li=document.createElement("li");
    const color=a.status==="read"?"status-read":a.status==="reading"?"status-reading":"status-unread";
    li.innerHTML=`<div><b>${a.title}</b></div>
    <div class="meta">${a.authors||"—"} <span class="badge ${color}">${labelStatus(a.status)}</span></div>
    ${a.category?`<div>${a.category}</div>`:""}
    ${a.tags.length?`<div>${a.tags.map(t=>`<span class="badge">#${t}</span>`).join("")}</div>`:""}
    ${a.note?`<div>${a.note}</div>`:""}
    <div class="meta">
      <button onclick="toggleStatus('${a.id}')">Статус</button>
      <button onclick="removeArticle('${a.id}')">Удалить</button>
    </div>`;
    list.appendChild(li);
  });
}
function labelStatus(s){return s==="read"?"Прочитано":s==="reading"?"В процессе":"Непрочитано";}
function addArticle(){
  const title=$("title").value.trim(),authors=$("authors").value.trim();
  if(!title||!authors){alert("Введите название и авторов");return;}
  const a={id:crypto.randomUUID(),title,authors,year:$("year").value.trim(),category:$("category").value.trim(),tags:toTags($("tags").value),note:$("note").value.trim(),status:"unread"};
  articles.unshift(a);clearForm();renderList();
}
function clearForm(){["title","authors","year","category","tags","note"].forEach(id=>$(`${id}`).value="");}
function removeArticle(id){articles=articles.filter(a=>a.id!==id);renderList();}
function toggleStatus(id){const a=articles.find(x=>x.id===id);if(!a)return;a.status=a.status==="unread"?"reading":a.status==="reading"?"read":"unread";renderList();}
$("addBtn").onclick=addArticle;$("clearBtn").onclick=clearForm;
$("q").oninput=renderList;$("filterCategory").oninput=renderList;$("filterStatus").onchange=renderList;$("resetFilters").onclick=()=>{$("q").value=$("filterCategory").value=$("filterStatus").value="";renderList();};
renderList();
