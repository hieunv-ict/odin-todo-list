import { Task } from "./task";
import { addTaskToProject } from "./projectManager";
import { observer } from "./observer";
let newTaskDialog = document.querySelector(".new-task-dialog");
let addTaskForm = newTaskDialog.querySelector(".new-task-form");
let cancelBtn = addTaskForm.querySelector(".cancel-btn");
// cancel button clicked -> close the dialog and not create new task
cancelBtn.addEventListener("click", e =>{e.preventDefault(); newTaskDialog.close()});
 // submit button clicked with all input filled -> create new task 
addTaskForm.addEventListener("submit", e =>{
    let taskTitle = addTaskForm.querySelector("#task-title").value;
    let taskPriority = addTaskForm.querySelector("#task-priority").value;
    let taskDate = addTaskForm.querySelector("#task-date").value;
    let taskDesc = addTaskForm.querySelector("#task-description").value;
    addTaskToDefaultProject(taskTitle, taskDate, taskPriority, taskDesc);

});
// open form for adding task
export function openNewTaskForm(){
    // open dialog form
    newTaskDialog.showModal();
}
//create task
function addTaskToDefaultProject(title, date, priority, description){
    // store task to project's task list
    let task = new Task(title, date, priority);
    task.description = description;
    addTaskToProject(task, "default");
    // display new task to the page
    let taskContainer = document.querySelector(".task-container");
    taskContainer.appendChild(createTaskElement(task));
    observer.add("Complete Task", removeTaskElement);

}

function createTaskElement(task){
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

