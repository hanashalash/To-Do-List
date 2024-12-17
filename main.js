let taskInput = document.getElementById("task");
const btnAdd = document.getElementById("add");
const btnUpdate = document.getElementById("update");
const btnDelete = document.getElementById("delete");
let counter;
let taskIndex;

let taskContainer = JSON.parse(localStorage.getItem("Task")) || [];
displayTodo();

btnAdd.addEventListener("click", addTodo);

taskInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    if (btnUpdate.classList.contains("d-none")) {
      addTodo();
    } else if (btnAdd.classList.contains("d-none")) {
      updateTask();
    }
  }
});
btnUpdate.addEventListener("click", updateTask);

function addTodo() {
  let taskInputValue = taskInput.value;
  if (taskInputValue) {
    taskContainer.push(taskInputValue);
    localStorage.setItem("Task", JSON.stringify(taskContainer));
    displayTodo();
    clearInputs();
  } else {
    window.alert("Please add a to do list item.");
  }
}

function clearInputs() {
  taskInput.value = "";
}

function displayTodo() {
  let loopContainer = "";
  if (taskContainer.length == 0) {
    loopContainer += `<td class="fw-light text-center">Task List is Empty!</td>`;
  } else {
    for (let i = 0; i < taskContainer.length; i++) {
      loopContainer += `
                <tr>
                    <td>${i + 1}</td>
                    <td>
                    <span>${taskContainer[i]}</span>
                    </td>
                    <td>
                    <a style="cursor: pointer" class="update"
                        ><i class="fas fa-pen fa-lg text-warning me-3" onclick="editTaskForm(${i})"></i
                    ></a>
                    </td>
                    <td>
                    <a style="cursor: pointer" class="delete"
                        ><i class="fas fa-trash-alt fa-lg text-danger" onclick="deleteTask(${i})"></i
                    ></a>
                    </td>
              </tr>`;
    }
  }
  document.getElementById("display").innerHTML = loopContainer;
}

function updateTask() {
  if (taskInput.value) {
    taskContainer[taskIndex] = taskInput.value;
    localStorage.setItem("Task", JSON.stringify(taskContainer));
    displayTodo();
    clearInputs();
  } else {
    window.alert("Please add a to do list item.");
  }
  btnUpdate.classList.add("d-none");
  btnAdd.classList.remove("d-none");
}

function editTaskForm(index) {
  taskInput.value = taskContainer[index];
  btnUpdate.classList.remove("d-none");
  btnAdd.classList.add("d-none");
  taskIndex = index;
}

function deleteTask(index) {
  taskContainer.splice([index], 1);
  localStorage.setItem("Task", JSON.stringify(taskContainer));
  displayTodo();
}

function footerCounter() {
  counter = taskContainer.length + 1;

  document.getElementById("counter").innerHTML = counter;
}

function clearList() {}


// replace serial with checkmark
// dynamic footer counter
// categorize
// animations
// strikethrough done items
// clearList()