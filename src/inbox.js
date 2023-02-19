import Task from "./task";
import Storage from "./storage";

export { buildInboxSection };

// --- "Add Task" Element ---
const addTask = document.createElement("div");
addTask.innerHTML = "<b>+</b> &nbsp; Add Task";
addTask.classList.add("task");
addTask.id = "addTask";
// --------------------------

function buildInboxSection(taskContainer) {
  const heading2 = document.createElement("h2");
  heading2.textContent = "Inbox";

  taskContainer.appendChild(heading2);

  // Load any tasks saved in localStorage
  loadTasks("Inbox", taskContainer);

  taskContainer.appendChild(addTask);

  addTask.addEventListener("click", (event) => {
    // Create task element with input field
    taskContainer.removeChild(addTask);
    createTaskElementWithInput(taskContainer);
  });

  // Event listener for adding a task, by pressing "Enter"
  document.addEventListener("keydown", (e) => {
    // Create the task when user presses "Enter"
    if (e.key === "Enter") {
      const input = document.getElementById("input");

      // Check if there is a valid input to create the task
      if (input !== null && input.value.length !== 0) {
        const taskElement = input.parentElement;
        createTask(taskContainer, taskElement, input);
        taskContainer.appendChild(addTask);
      }
    }
  });
}

function loadTasks(projectName, taskContainer) {
  const project = Storage.getProject(projectName);

  const allTasks = project.getAllTasks();

  for (let i = 0; i < allTasks.length; i++) {
    createTaskElementFromStorage(taskContainer, allTasks[i]);
  }
}

function createTaskElementFromStorage(taskContainer, task) {
  const newTask = document.createElement("div");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.value = "done";
  checkbox.checked = task.isCompleted();

  checkbox.addEventListener("change", () => {
    let taskIndex = getTaskIndex(taskContainer, newTask);
    Storage.updateTaskCompleted("Inbox", taskIndex, checkbox.checked);
  });

  // task content
  const text = document.createElement("div");
  text.classList.add("task-content");
  text.style.flex = "1";
  text.textContent = task.getName();

  // close icon
  const closeIcon = document.createElement("div");
  closeIcon.textContent = "x";
  closeIcon.classList.add("close-icon");

  closeIcon.addEventListener("click", () => {
    let taskIndex = getTaskIndex(taskContainer, newTask);
    Storage.deleteTask("Inbox", taskIndex);
    removeTaskElement(taskContainer, newTask);
  });

  newTask.appendChild(checkbox);
  newTask.appendChild(text);
  newTask.appendChild(closeIcon);

  newTask.classList.add("task");

  taskContainer.appendChild(newTask);
}

function createTaskElementWithInput(taskContainer) {
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

  // Only remove taskElement, because we have not added task to localStorage yet
  closeIcon.addEventListener("click", () =>
    removeTaskElement(taskContainer, newTask)
  );

  // To put the input field in focus
  input.select();
}

function createTask(taskContainer, taskElement, input) {
  // Remove input field
  const text = taskElement.querySelector(".task-content");
  text.textContent = input.value;
  text.style.display = "block";
  text.style.flex = "1";
  taskElement.removeChild(input);

  // Event listener for checkbox to update localStorage
  const checkbox = taskElement.querySelector(".checkbox");
  checkbox.addEventListener("change", () => {
    let taskIndex = getTaskIndex(taskContainer, taskElement);
    Storage.updateTaskCompleted("Inbox", taskIndex, checkbox.checked);
  });

  // Event listener for close icon to update localStorage
  const closeIcon = taskElement.querySelector(".close-icon");
  closeIcon.addEventListener("click", () => {
    let taskIndex = getTaskIndex(taskContainer, taskElement);
    Storage.deleteTask("Inbox", taskIndex);
  });

  // Add task to localStorage
  Storage.addTask(
    "Inbox",
    new Task(text.textContent, taskElement.querySelector(".checkbox").checked)
  );
}

function removeTaskElement(taskContainer, taskElement) {
  taskContainer.removeChild(taskElement);
  if (!taskContainer.querySelector("#addTask")) {
    taskContainer.appendChild(addTask);
  }
}

function getTaskIndex(taskContainer, task) {
  let taskIndex = Array.from(taskContainer.children).indexOf(task);
  return taskIndex - 1;
}
