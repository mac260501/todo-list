import Project from "./project";
import Task from "./task";

export default class Storage {
  static getProject(projectName) {
    const project = Object.assign(
      new Project(),
      JSON.parse(localStorage.getItem(projectName))
    );

    project.setAllTasks(
      project.getAllTasks().map((task) => Object.assign(new Task(), task))
    );

    return project;
  }

  static updateProject(projectName, data) {
    localStorage.setItem(projectName, JSON.stringify(data));
  }

  static addProject(projectName) {
    if (localStorage.getItem(projectName) === null) {
      localStorage.setItem(
        projectName,
        JSON.stringify(new Project(projectName))
      );
    }
  }

  static deleteProject(projectName) {}

  static addTask(projectName, task) {
    const project = Storage.getProject(projectName);
    project.addTask(task);
    Storage.updateProject(projectName, project);
  }

  static updateTaskCompleted(projectName, taskIndex, taskCompleted) {
    const project = Storage.getProject(projectName);
    project.getTask(taskIndex).setCompleted(taskCompleted);
    Storage.updateProject(projectName, project);
  }

  static deleteTask(projectName, index) {}
}
