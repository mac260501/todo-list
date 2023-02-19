export default class Task {
  constructor(name, completed) {
    this.name = name;
    this.completed = completed;
  }

  getName() {
    return this.name;
  }

  setCompleted(completed) {
    this.completed = completed;
  }

  isCompleted() {
    return this.completed;
  }

  // TODO: editName, Due Dates
}
