const taskInput = document.getElementById("task");
const btnAdd = document.getElementById("add");
const btnUpdate = document.getElementById("update");
const btnDelete = document.getElementById("delete");
const deleteList = document.getElementById("clearList");
const taskStatus = document.getElementById("display");
const taskUndone = document.getElementsByClassName("fa-circle");
const taskDone = document.getElementsByClassName("fa-circle-check");
const counter = document.getElementById("counter");
const weather = document.getElementById("weather");
let task = document.getElementById("display");
let taskIndex;
let myWeather = [];

let taskContainer = JSON.parse(localStorage.getItem("Task")) || [];
displayTodo();
displayWeather();

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

deleteList.addEventListener("click", clearList);

//toggling between done and undone
taskStatus.addEventListener("click", function (event) {
  const taskRow = event.target.closest("tr");
  taskIndex = Array.from(taskRow.parentElement.children).indexOf(taskRow);
  const taskText = taskRow.querySelector(".taskText");

  if (event.target.classList.contains("fa-circle")) {
    event.target.classList.add("d-none");
    event.target.nextElementSibling.classList.remove("d-none");
    taskText.classList.add("done");
    taskContainer[taskIndex].taskStatus = "done";
  } else if (event.target.classList.contains("fa-circle-check")) {
    event.target.classList.add("d-none");
    event.target.previousElementSibling.classList.remove("d-none");
    taskText.classList.remove("done");

    taskContainer[taskIndex].taskStatus = "undone";
  }
  localStorage.setItem("Task", JSON.stringify(taskContainer));
  footerCounter();
});

function addTodo() {
  let taskInputValue = taskInput.value;
  if (taskInputValue) {
    let taskObject = {
      taskItem: taskInputValue,
      taskStatus: "undone",
    };
    taskContainer.push(taskObject);
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
    loopContainer += `<td colspan=4 class=" fw-light text-center"> Your task list is empty!</td>`;
  } else {
    for (let i = 0; i < taskContainer.length; i++) {
      loopContainer += `
                <tr>
                    <td>
                      <i style="cursor: pointer" class="fa-regular fa-circle"></i>
                      <i class="fa-regular fa-circle-check d-none"></i>
                    </td>
                    <td>
                      <span class="taskText ${
                        taskContainer[i].taskStatus === "done" ? "done" : ""
                      }">
                      ${taskContainer[i].taskItem}
                      </span> </td>
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
  footerCounter();
}

function editTaskForm(index) {
  taskInput.value = taskContainer[index].taskItem;
  btnUpdate.classList.remove("d-none");
  btnAdd.classList.add("d-none");
  taskIndex = index;
}

function updateTask() {
  if (taskInput.value) {
    taskContainer[taskIndex].taskItem = taskInput.value;
    localStorage.setItem("Task", JSON.stringify(taskContainer));
    displayTodo();
    clearInputs();
  } else {
    window.alert("Please add a to do list item.");
  }
  btnUpdate.classList.add("d-none");
  btnAdd.classList.remove("d-none");
}

function deleteTask(index) {
  Swal.fire({
    title: "Delete task?",
    text: "This can't be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
      });
      taskContainer.splice([index], 1);
      localStorage.setItem("Task", JSON.stringify(taskContainer));
      displayTodo();
    }
  });
}

function clearList() {
  localStorage.clear();
  taskContainer = [];
  displayTodo();
}

function footerCounter() {
  let undoneCount = 0;
  for (let i = 0; i < taskContainer.length; i++) {
    if (taskContainer[i].taskStatus == "undone") {
      undoneCount++;
    }
  }
  document.getElementById("counter").innerHTML = undoneCount;
}

//Weather API
async function displayWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=8c3f90441c2c488f919212256241212&q=cairo`
    );
    const weatherData = await response.json();
    document.getElementById("weather").innerHTML = `
      <div class="h2 poppins-bold text-white text-center">${weatherData.current.temp_c} <sup>o</sup> C</div>`;
  } catch (error) {
    console.error(error);
    document.getElementById(
      "weather"
    ).innerHTML = `<div class="text-danger">Unable to fetch weather data.</div>`;
  }
}
