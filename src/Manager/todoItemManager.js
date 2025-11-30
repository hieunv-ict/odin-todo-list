import { Task } from "../task";
import { addTaskToProject, DEFAULT_PROJECT_NAME } from "./projectManager";
import { observer } from "../Tools/observer";

let newTaskDialog = document.querySelector(".new-task-dialog");


export function initAddTask(projectName){
    let addTaskForm = newTaskDialog.querySelector(".new-task-form");
    let cancelBtn = addTaskForm.querySelector(".cancel-btn");
    // cancel button clicked -> close the dialog and not create new task
    cancelBtn.addEventListener("click", e =>{e.preventDefault(); newTaskDialog.close()});
    // submit button clicked with all input filled -> create new task 
    let formClone = addTaskForm.cloneNode(true);
    addTaskForm.parentNode.replaceChild(formClone, addTaskForm);
    formClone.addEventListener("submit", e =>{
        //create task, display task and add to default project
        let task = createTask(formClone);
        addTaskToProject(task, projectName);
        displayTask(task);
    });
}

initAddTask(DEFAULT_PROJECT_NAME);
// open form for adding task
export function openNewTaskForm(){
    // open dialog form
    newTaskDialog.showModal();
}

function createTask(form){
    // create new Task object
    let taskTitle = form.querySelector("#task-title").value;
    let taskPriority = form.querySelector("#task-priority").value;
    let taskDate = form.querySelector("#task-date").value;
    let taskDesc = form.querySelector("#task-description").value;
    let task = new Task(taskTitle, taskDate, taskPriority, taskDesc);
    return task;
}

function displayTask(task){
    // display new task to the page
    let taskContainer = document.querySelector(".task-container");
    taskContainer.appendChild(createTaskElement(task));
    observer.add("Complete Task", removeTaskElement);

}

export function createTaskElement(task){
        // button for completing task
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.addEventListener("click", e => task.completeTask());
        let taskCard = document.createElement("div");
        taskCard.classList.add("task-item");
        let cardTitle = document.createElement("h2");
        cardTitle.textContent = task.title;
        let cardDate = document.createElement("p");
        cardDate.textContent = task.date;
        let cardPriority = document.createElement("p");
        cardPriority.textContent = task.priority;
        let cardDesc = document.createElement("p");
        cardDesc.textContent = task.description;
        // add data attribute of task id to task card
        taskCard.dataset.id = task.id;
        taskCard.appendChild(completeBtn);
        taskCard.appendChild(cardTitle);
        taskCard.appendChild(cardPriority);
        taskCard.appendChild(cardDesc);
        taskCard.appendChild(cardDate);
        return taskCard;
    }

function removeTaskElement(task){
    let tasks = document.querySelectorAll(".task-item");
    for (let item of tasks){
        if (task.id === item.dataset.id){
            item.remove();
            observer.remove("Complete Task", removeTaskElement);
            break;
        }
    }
}

