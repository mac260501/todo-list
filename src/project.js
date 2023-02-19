export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  getAllTasks() {
    return this.tasks;
  }

  setAllTasks(tasks) {
    this.tasks = tasks;
  }

  getTask(index) {
    return this.tasks[index];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }
}
