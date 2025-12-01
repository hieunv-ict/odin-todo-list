import { observer } from "../Tools/observer";
import { Project } from "../project";
import { Task } from "../task";
export let projectList = {};
export const DEFAULT_PROJECT_NAME = "General";
let defaultProject = new Project(DEFAULT_PROJECT_NAME);
projectList[DEFAULT_PROJECT_NAME] = defaultProject;


observer.add("Delete Project", removeProject);
// add task to a project
export function addTaskToProject(task, prjName){
    let prj = projectList[prjName];
    if (prj){
        prj.taskList.push(task);
        observer.emit("Save Data", projectList);
    }
    else{
        throw new Error("Cannot found project " + prjName);
    }
}
export function saveTaskChanged(){
    observer.emit("Save Data", projectList);
}

export function deleteProject(name){
    observer.emit("Delete Project", projectList[name]);
    observer.emit("Save Data", projectList);
}

function removeProject(project){
    delete projectList[project.name];
}

export function setProjectList(tmpList){
    for (let prj in tmpList){
        let newPrj = new Project(tmpList[prj].name);
        
        for (let item of tmpList[prj].taskList){
            let task = new Task();
            Object.assign(task, item);
            newPrj.addTask(task);
        }
        projectList[prj] = newPrj;
        
    }
}



