import Task from "./task";
import Project from "./project";
import Storage from "./storage";
import "./style.css";

export { buildPage };

// --- "Add Task" Element ---
const addTask = document.createElement("div");
addTask.innerHTML = "<b>+</b> &nbsp; Add Task";
addTask.classList.add("task");
addTask.id = "addTask";

// --- "Add Project" Element ---
const addProject = document.createElement("div");
addProject.innerHTML = "<b>+</b> &nbsp; Add Project";
addProject.classList.add("tab");
addProject.id = "addProject";
// --------------------------

const contentDiv = document.getElementById("content");
const navBar = document.createElement("div");
const taskContainer = document.createElement("div");

let currProjectName;
let allProjectTabs = {};

function buildPage() {
  // ----------- Header ----------
  const header = document.createElement("header");
  header.classList.add("header");

  const heading1 = document.createElement("h1");
  heading1.textContent = "Todo List";

  header.appendChild(heading1);

  // ------------ Main ----------

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("main");

  // --- Nav Bar ---
  // buildNavBar();
  navBar.classList.add("nav-bar");

  // Inbox
  const inboxTab = document.createElement("div");
  inboxTab.classList.add("tab");
  inboxTab.textContent = "Inbox";
  Storage.addProject("Inbox");

  // Today
  const todayTab = document.createElement("div");
  todayTab.classList.add("tab");
  todayTab.textContent = "Today";
  Storage.addProject("Today");

  // Project header
  const projectHeader = document.createElement("h2");
  projectHeader.classList.add("project-header");
  projectHeader.textContent = "Projects";

  navBar.appendChild(inboxTab);
  navBar.appendChild(todayTab);
  navBar.appendChild(projectHeader);
  navBar.appendChild(addProject);

  // -- Task Container ---

  taskContainer.classList.add("task-container");

  buildProjectView("Inbox");
  allProjectTabs["Inbox"] = inboxTab;
  currProjectName = "Inbox";
  styleTab("Inbox");

  mainDiv.appendChild(navBar);
  mainDiv.appendChild(taskContainer);

  // ------------- Footer ----------
  const footer = document.createElement("footer");

  const footerText = document.createElement("p");
  footerText.textContent = "Copyright © The Odin Project 2023";

  footer.appendChild(footerText);

  footer.classList.add("footer");

  // -------------------------------

  contentDiv.appendChild(header);
  contentDiv.appendChild(mainDiv);
  contentDiv.appendChild(footer);

  // ----- Event Listeners for Tabs -------
  addProject.addEventListener("click", (event) => {
    // Remove active task input element, if any
    // We only want one input active at a time
    const addTaskInput = document.getElementById("taskInput");
    if (addTaskInput !== null) {
      removeTaskElement(addTaskInput.parentElement);
    }
    // Create project tab with input field
    navBar.removeChild(addProject);
    createProjectTabWithInput();
  });

  // Event listener for adding a task or project, by pressing "Enter"
  document.addEventListener("keydown", (e) => {
    // Create the task when user presses "Enter"
    if (e.key === "Enter") {
      // Check if there is a valid taskInput to create the task
      const taskInput = document.getElementById("taskInput");
      if (taskInput !== null && taskInput.value.length !== 0) {
        const taskElement = taskInput.parentElement;
        createTask(currProjectName, taskElement, taskInput);
        taskContainer.appendChild(addTask);
      }

      // Check if there is a valid projectInput to create the project
      const projectInput = document.getElementById("projectInput");
      if (projectInput !== null && projectInput.value.length !== 0) {
        const projectTab = projectInput.parentElement;
        createProject(projectTab, projectInput);
        navBar.appendChild(addProject);
        const projectName =
          projectTab.querySelector(".project-content").textContent;
        allProjectTabs[projectName] = projectTab;
      }
    }
  });
}

function buildProjectView(projectName) {
  const heading2 = document.createElement("h2");
  heading2.textContent = projectName;

  taskContainer.appendChild(heading2);

  // Load any tasks saved in localStorage
  loadTasks(projectName);

  taskContainer.appendChild(addTask);

  addTask.addEventListener("click", (event) => {
    const addProjectInput = document.getElementById("projectInput");
    if (addProjectInput !== null) {
      removeProjectTab(addProjectInput.parentElement);
    }
    // Create task element with input field
    taskContainer.removeChild(addTask);
    createTaskElementWithInput();
  });
}

function loadTasks(projectName) {
  const project = Storage.getProject(projectName);

  const allTasks = project.getAllTasks();

  for (let i = 0; i < allTasks.length; i++) {
    createTaskElementFromStorage(projectName, allTasks[i]);
  }
}

function createTaskElementFromStorage(projectName, task) {
  const newTask = document.createElement("div");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.value = "done";
  checkbox.checked = task.isCompleted();

  checkbox.addEventListener("change", () => {
    let taskIndex = getTaskIndex(newTask);
    Storage.updateTaskCompleted(projectName, taskIndex, checkbox.checked);
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
    let taskIndex = getTaskIndex(newTask);
    Storage.deleteTask(projectName, taskIndex);
    removeTaskElement(newTask);
  });

  newTask.appendChild(checkbox);
  newTask.appendChild(text);
  newTask.appendChild(closeIcon);

  newTask.classList.add("task");

  taskContainer.appendChild(newTask);
}

function createProjectTabWithInput() {
  const newProject = document.createElement("div");

  // input field
  const input = document.createElement("input");
  input.type = "text";
  input.id = "projectInput";
  input.name = "project";
  input.maxLength = "20";

  // project content
  const text = document.createElement("div");
  text.classList.add("project-content");
  text.style.display = "none";

  // close icon
  const closeIcon = document.createElement("div");
  closeIcon.textContent = "x";
  closeIcon.classList.add("close-icon");

  newProject.appendChild(input);
  newProject.appendChild(text);
  newProject.appendChild(closeIcon);

  newProject.classList.add("tab");

  navBar.appendChild(newProject);

  // Only remove taskElement, because we have not added task to localStorage yet
  closeIcon.addEventListener("click", () => removeProjectTab(newProject));

  // To put the input field in focus
  input.select();
}

function createTaskElementWithInput() {
  const newTask = document.createElement("div");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.value = "done";

  // input field
  const input = document.createElement("input");
  input.type = "text";
  input.id = "taskInput";
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
  closeIcon.addEventListener("click", () => removeTaskElement(newTask));

  // To put the input field in focus
  input.select();
}

function createTask(projectName, taskElement, input) {
  // Remove input field
  const text = taskElement.querySelector(".task-content");
  text.textContent = input.value;
  text.style.display = "block";
  text.style.flex = "1";
  taskElement.removeChild(input);

  // Event listener for checkbox to update localStorage
  const checkbox = taskElement.querySelector(".checkbox");
  checkbox.addEventListener("change", () => {
    let taskIndex = getTaskIndex(taskElement);
    Storage.updateTaskCompleted(projectName, taskIndex, checkbox.checked);
  });

  // Event listener for close icon to update localStorage
  const closeIcon = taskElement.querySelector(".close-icon");
  closeIcon.addEventListener("click", () => {
    let taskIndex = getTaskIndex(taskElement);
    Storage.deleteTask(projectName, taskIndex);
  });

  // Add task to localStorage
  Storage.addTask(
    projectName,
    new Task(text.textContent, taskElement.querySelector(".checkbox").checked)
  );
}

function createProject(projectTab, input) {
  // Remove input field
  const text = projectTab.querySelector(".project-content");
  text.textContent = input.value;
  text.style.display = "block";
  text.style.flex = "1";
  projectTab.removeChild(input);

  // Event listener for close icon to update localStorage
  //   const closeIcon = taskElement.querySelector(".close-icon");
  //   closeIcon.addEventListener("click", () => {
  //     let taskIndex = getTaskIndex(taskElement);
  //     Storage.deleteTask(projectName, taskIndex);
  //   });

  // Add task to localStorage
  //   Storage.addTask(
  //     projectName,
  //     new Task(text.textContent, taskElement.querySelector(".checkbox").checked)
  //   );
}

function removeTaskElement(taskElement) {
  taskContainer.removeChild(taskElement);
  if (!taskContainer.querySelector("#addTask")) {
    taskContainer.appendChild(addTask);
  }
}

function removeProjectTab(projectTab) {
  navBar.removeChild(projectTab);
  if (!navBar.querySelector("#addProject")) {
    navBar.appendChild(addProject);
  }
}

function getTaskIndex(task) {
  let taskIndex = Array.from(taskContainer.children).indexOf(task);
  return taskIndex - 1;
}

// Helper function to clear main div
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Helper function to style tab, while removing style from current tab
function styleTab(newTab) {
  allProjectTabs[currProjectName].style.backgroundColor = "inherit";
  allProjectTabs[currProjectName].style.fontWeight = "inherit";
  allProjectTabs[newTab].style.backgroundColor = "#ccc";
  allProjectTabs[newTab].style.fontWeight = "bold";
}
