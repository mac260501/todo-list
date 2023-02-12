function buildInboxSection(taskContainer) {
  const heading2 = document.createElement("h2");
  heading2.textContent = "Inbox";

  const addTask = document.createElement("div");
  addTask.innerHTML = "<b>+</b> &nbsp;&nbsp; Add Task";
  addTask.classList.add("add-task");

  taskContainer.appendChild(heading2);
  taskContainer.appendChild(addTask);
}

export { buildInboxSection };
