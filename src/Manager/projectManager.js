import { observer } from "../Tools/observer";
import { Project } from "../project";
import { createTaskElement } from "./todoItemManager";

export let projectList = {};
let defaultProject = new Project();
projectList["default"] = defaultProject;


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

let newPrjDialog = document.querySelector(".new-prj-dialog");
let addPrjForm = newPrjDialog.querySelector(".new-prj-form");
let cancelBtn = addPrjForm.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", e =>{e.preventDefault(); newPrjDialog.close()});
// add new project -> If project with the same name existed -> throw error.
addPrjForm.addEventListener("submit", e =>{
    let prjTitle = addPrjForm.querySelector("#prj-title").value;
    let newPrj = new Project(prjTitle);
    if (!projectList[prjTitle]){
        projectList[prjTitle] = newPrj;
        let prjContainer = document.querySelector(".prj-container");
        let prjItem = createPrjItem(newPrj);
        prjItem.querySelector(".prj-title").addEventListener("click", e=> openProject(newPrj));
        prjContainer.appendChild(prjItem);
    }
    else{
        throw new Error(`Project ${prjTitle} has existed.`);
    }
});
export function addNewProject(){
    newPrjDialog.showModal();
}

function createPrjItem(prj){
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", e => deleteProject(prj));

    let prjCard = document.createElement("div");
    prjCard.classList.add("prj-item");
    let prjTitle = document.createElement("h3");
    prjTitle.classList.add("prj-title");
    prjTitle.textContent = prj.prjName;

    prjCard.appendChild(prjTitle);
    prjCard.appendChild(deleteBtn);
    return prjCard;
}

function deleteProject(prj){
    let name = prj.prjName;
    // delete project from project list
    delete projectList[name];
    // remove project card from display
    let prjCards = document.querySelectorAll(".prj-item");

    for (let card of prjCards){
        let title = card.querySelector("h3").textContent;
        if (title === name){
            card.remove();
            break;
        }
    }
}

function openProject(project){
    // open project page

    

    //clear tasks and button on the page
    let mainContent = document.querySelector(".main-container.content");
    mainContent.removeChild();
    // project page has an add task button for only that project
    let addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    // addTaskBtn.addEventListener("click", e =>)
    //render tasks of the chosen projecct
    for (let task of project.taskList){
        createTaskElement(task);
    }
}
