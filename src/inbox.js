import Task from "./task";

const addTask = document.createElement("div");
addTask.innerHTML = "<b>+</b> &nbsp; Add Task";
addTask.classList.add("task");
addTask.id = "addTask";

function buildInboxSection(taskContainer) {
  const heading2 = document.createElement("h2");
  heading2.textContent = "Inbox";

  addTask.addEventListener("click", (event) => {
    taskContainer.removeChild(addTask);
    createTask(taskContainer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const input = document.getElementById("input");
      if (input !== null && input.value.length !== 0) {
        const newTask = input.parentElement;
        const text = newTask.querySelector(".task-content");
        text.textContent = input.value;
        text.style.display = "block";
        text.style.flex = "1";
        newTask.removeChild(input);
        taskContainer.appendChild(addTask);
      }
    }
  });

  taskContainer.appendChild(heading2);
  taskContainer.appendChild(addTask);
}

function createTask(taskContainer) {
  const newTask = document.createElement("div");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.value = "done";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "input";
  input.name = "task";
  input.maxLength = "50";
  input.autofocus = true;

  const text = document.createElement("div");
  text.classList.add("task-content");
  text.style.display = "none";

  const closeIcon = document.createElement("div");
  closeIcon.textContent = "x";
  closeIcon.classList.add("close-icon");

  newTask.appendChild(checkbox);
  newTask.appendChild(input);
  newTask.appendChild(text);
  newTask.appendChild(closeIcon);

  newTask.classList.add("task");

  taskContainer.appendChild(newTask);

  closeIcon.addEventListener("click", () => {
    taskContainer.removeChild(closeIcon.parentElement);
    if (!taskContainer.querySelector("#addTask")) {
      taskContainer.appendChild(addTask);
    }
  });
}

export { buildInboxSection };
