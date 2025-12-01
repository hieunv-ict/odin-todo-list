import { Project } from "../project";
import { createTaskElement, displayTask, initAddTask, openNewTaskForm } from "./todoDOM";
import { projectList, DEFAULT_PROJECT_NAME } from "../Manager/projectManager";
import { observer } from "../Tools/observer";
import { deleteProject } from "../Manager/projectManager";

let prjContainer = document.querySelector(".prj-container");
observer.add("Delete Project", deleteProjectElem);
//display first project and list of projects when the page is loaded
export function displayData(){
    const firstKey = Object.keys(projectList)[0]
    openProject(projectList[firstKey]);
    displayAllProjects();
    
}
//displayData();
//display list of projects on sidebar
function displayAllProjects(){
    for (let prj in projectList){
        let projectObj = projectList[prj]
        let prjItem = createPrjItem(projectObj);
        prjItem.querySelector(".prj-title").addEventListener("click", e=> openProject(projectObj));
        prjContainer.appendChild(prjItem);
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
        let prjItem = createPrjItem(newPrj);
        prjItem.querySelector(".prj-title").addEventListener("click", e=> openProject(newPrj));
        prjContainer.appendChild(prjItem);
        observer.emit("Save Data", projectList);
    }
    else{
        throw new Error(`Project ${prjTitle} has existed.`);
    }
});
export function addNewProject(){
    newPrjDialog.showModal();
}

function createPrjItem(prj){
    observer.add("Complete Task", prj.removeTask.bind(prj));
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", e => deleteProject(prj.name));

    let prjCard = document.createElement("div");
    prjCard.classList.add("prj-item");
    let prjTitle = document.createElement("h3");
    prjTitle.classList.add("prj-title");
    prjTitle.textContent = prj.name;

    prjCard.appendChild(prjTitle);
    prjCard.appendChild(deleteBtn);
    return prjCard;
}

function deleteProjectElem(prj){
    let name = prj.name;
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

// open project page to display project's task
function openProject(project){
    
    //clear tasks and button on the page
    let mainContent = document.querySelector(".main-container > .content");
    while(mainContent.firstChild){
        mainContent.removeChild(mainContent.firstChild);
    }

    //project title
    let prjTitle = document.createElement("h2");
    prjTitle.textContent = project.name;
    prjTitle.classList.add("prj-title-content");
    // project page has an add task button for only that project
    let addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.classList.add(".new-task-btn");
    initAddTask(project.name);
    addTaskBtn.addEventListener("click", e => openNewTaskForm());

    //render tasks of the chosen projecct and other elements

    mainContent.appendChild(prjTitle);
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    mainContent.appendChild(taskContainer);

    let projectTasks = project.taskList;
    for (let i = 0; i < projectTasks.length; i++){
        displayTask(projectTasks[i]);
    }
    mainContent.appendChild(addTaskBtn);

}
