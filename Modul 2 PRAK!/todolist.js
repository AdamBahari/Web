const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");
let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

function renderToDoItems() {
  listItems.innerHTML = '';
  todo.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div title="Double Click to Complete" ondblclick="CompletedToDoItems(this)" style="${element.status ? 'text-decoration: line-through;' : ''}">
        ${element.item}
        ${element.status ? '<img class="todo-controls" src="/images/check-mark.png" />' : ''}
      </div>
      <div>
        ${!element.status ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="ToDoList/icon/pencil.png" />' : ''}
        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="ToDoList/icon/trash.png" />
      </div>`;
    listItems.appendChild(li);
  });
}

function CreateOrUpdateToDoItems() {
  if (!todoValue.value) return alert("Please enter your todo text!");

  let existingItem = todo.find(el => el.item === todoValue.value);
  if (existingItem) return;

  let itemList = { item: todoValue.value, status: false };
  todo.push(itemList);
  setLocalStorage();
  todoValue.value = '';
  renderToDoItems();
}

function UpdateToDoItems(e) {
  const itemText = e.parentElement.parentElement.querySelector("div").innerText.trim();
  todoValue.value = itemText;
  addUpdate.onclick = () => {
    const item = todo.find(el => el.item === itemText);
    if (item) item.item = todoValue.value;
    setLocalStorage();
    todoValue.value = '';
    addUpdate.onclick = CreateOrUpdateToDoItems;
    renderToDoItems();
  };
}

function DeleteToDoItems(e) {
  const deleteValue = e.parentElement.parentElement.querySelector("div").innerText.trim();
  todo = todo.filter(el => el.item !== deleteValue);
  setLocalStorage();
  renderToDoItems();
}

function CompletedToDoItems(e) {
  const itemText = e.querySelector("div").innerText.trim();
  const item = todo.find(el => el.item === itemText);
  if (item) {
    item.status = true;
    setLocalStorage();
    renderToDoItems();
  }
}

addUpdate.onclick = CreateOrUpdateToDoItems;
renderToDoItems();
