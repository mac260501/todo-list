export default class Task {
  constructor(content, completed) {
    this.content = content;
    this.completed = completed;
  }

  getContent() {
    return this.content;
  }

  setCompleted(completed) {
    this.completed = completed;
  }

  // TODO: editContent, Due Dates
}
