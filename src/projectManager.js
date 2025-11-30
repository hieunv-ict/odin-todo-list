import { observer } from "./Tools/observer";
import { Project } from "./project";
export let projectList = {};
export const DEFAULT_PROJECT_NAME = "General";
let defaultProject = new Project(DEFAULT_PROJECT_NAME);
projectList[DEFAULT_PROJECT_NAME] = defaultProject;

// add task to a project
export function addTaskToProject(task, prjName){
    if (projectList[prjName]){
        projectList[prjName].taskList.push(task);
        observer.add("Complete Task", projectList[prjName].removeTask.bind(projectList[prjName]));
        task.project = prjName;
    }
    else{
        throw new Error("Cannot found project " + prjName);
    }
}