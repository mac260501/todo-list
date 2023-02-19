import Task from "./task";
import Project from "./project";
import Storage from "./storage";

// "Add Task" Element
const addTask = document.createElement("div");
addTask.innerHTML = "<b>+</b> &nbsp; Add Task";
addTask.classList.add("task");
addTask.id = "addTask";

function buildInboxSection(taskContainer) {
  const heading2 = document.createElement("h2");
  heading2.textContent = "Inbox";

  addTask.addEventListener("click", (event) => {
    // Initialize the task element
    taskContainer.removeChild(addTask);
    initializeTask(taskContainer);
  });

  document.addEventListener("keydown", (e) => {
    // Create task when user presses "Enter"
    if (e.key === "Enter") {
      const input = document.getElementById("input");
      if (input !== null && input.value.length !== 0) {
        createTask(input.parentElement, input);
        taskContainer.appendChild(addTask);
      }
    }
  });

  taskContainer.appendChild(heading2);
  taskContainer.appendChild(addTask);
}

function initializeTask(taskContainer) {
  const newTask = document.createElement("div");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.value = "done";

  // input field
  const input = document.createElement("input");
  input.type = "text";
  input.id = "input";
  input.name = "task";
  input.maxLength = "50";
  input.autofocus = true;

  // task content
  const text = document.createElement("div");
  text.classList.add("task-content");
  text.style.display = "none";

  // close icon
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

function createTask(taskElement, input) {
  const text = taskElement.querySelector(".task-content");
  text.textContent = input.value;
  text.style.display = "block";
  text.style.flex = "1";
  taskElement.removeChild(input);

  const checkbox = taskElement.querySelector(".checkbox");
  checkbox.addEventListener("change", () => {
    const taskElement = checkbox.parentElement;
    let taskIndex = Array.from(taskElement.parentNode.children).indexOf(
      taskElement
    );
    taskIndex--;
    Storage.updateTaskCompleted("Inbox", taskIndex, checkbox.checked);
  });

  Storage.addTask(
    "Inbox",
    new Task(text.textContent, taskElement.querySelector(".checkbox").checked)
  );
}

export { buildInboxSection };
