import { TodoTask } from "../task";
import { addTaskToProject, projectList, saveTaskChanged } from "../Manager/projectManager";
import { observer } from "../Tools/observer";


export function initAddTask(projectName){
    let newTaskDialog = document.querySelector(".new-task-dialog");
    let addTaskForm = newTaskDialog.querySelector(".new-task-form");
    
    // clone form node to new variable to remove old event listener
    let formClone = addTaskForm.cloneNode(true);
    addTaskForm.parentNode.replaceChild(formClone, addTaskForm);

    let cancelBtn = formClone.querySelector(".cancel-btn");
    // cancel button clicked -> close the dialog and not create new task
    cancelBtn.addEventListener("click", e =>{e.preventDefault(); newTaskDialog.close()});

    // submit button clicked with all input filled -> create new task 
    formClone.addEventListener("submit", e =>{
        //create task, display task and add to default project
        let task = createTask(formClone);
        addTaskToProject(task, projectName);
        displayTask(task);
    });
}

//initAddTask(DEFAULT_PROJECT_NAME);
// open form for adding task
export function openNewTaskForm(){
    // open dialog form
    document.querySelector(".new-task-dialog").showModal();
}

function priorityClass(task){
    let pri = task.priority;
    let res = pri.toLowerCase() + "-priority";
    return res;
}
 // create new Task object
function createTask(form){
    let taskTitle = form.querySelector("#task-title").value;
    let taskPriority = form.querySelector("#task-priority").value;
    let taskDate = form.querySelector("#task-date").value;
    let taskDesc = form.querySelector("#task-description").value;
    let task = new TodoTask(taskTitle, taskDate, taskPriority, taskDesc);
    return task;
}

// display new task to the page
export function displayTask(task){
    let taskContainer = document.querySelector(".task-container");
    let taskElem = createTaskElement(task);
    taskContainer.appendChild(taskElem);
    
    
}

// crete html element of task
export function createTaskElement(task){
    let completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", e =>{ 
        removeTaskElement(task);
        
    });

    //main element
    let taskCard = document.createElement("div");
    taskCard.classList.add("task-item");
    taskCard.classList.add(priorityClass(task));
    let cardTitle = document.createElement("h2");
    cardTitle.textContent = task.title;
    let cardDate = document.createElement("p");
    cardDate.textContent = "Due date: " + task.date;
    //hidden element
    let hiddenDetails = document.createElement("div");
    hiddenDetails.classList.add("details");
    let cardDesc = document.createElement("p");
    cardDesc.textContent = task.description;
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", e => {editTask(task, taskCard);});
    hiddenDetails.appendChild(cardDesc);
    hiddenDetails.appendChild(editBtn);
    // add data attribute of task id to task card
    taskCard.dataset.id = task.id;
    taskCard.appendChild(completeBtn);
    taskCard.appendChild(cardTitle)
    taskCard.appendChild(cardDate);
    taskCard.appendChild(hiddenDetails);
    
    collapsibleElem(hiddenDetails);
    function collapsibleElem(content){
        cardTitle.addEventListener("click", e =>{
            if (content.style.display === "block") {
            content.style.display = "none";
            } 
            else {
            content.style.display = "block";
            }
        })
    }
    return taskCard;
}

function editTask(task, taskCard){
    //open form for editting
    let newTaskDialog = document.querySelector(".new-task-dialog");
    let addTaskForm = newTaskDialog.querySelector(".new-task-form");
    
    // clone form node to new variable to remove old event listener
    let formClone = addTaskForm.cloneNode(true);
    addTaskForm.parentNode.replaceChild(formClone, addTaskForm);

    //set form's input value to task's properties
    formClone.querySelector("#task-title").value = task.title;
    formClone.querySelector("#task-priority").value = task.priority;
    formClone.querySelector("#task-date").value = task.date;
    formClone.querySelector("#task-description").value = task.description;


    let cancelBtn = formClone.querySelector(".cancel-btn");
    // cancel button clicked -> close the dialog and not create new task
    cancelBtn.addEventListener("click", e =>{e.preventDefault(); newTaskDialog.close()});

    // submit button clicked with all input filled -> create new task 
    formClone.addEventListener("submit", e =>{
        //change task properties
        let newTask = createTask(formClone);
        task.title = newTask.title;
        task.date = newTask.date;
        task.description = newTask.description;
        task.priority = newTask.priority;

        //reflect the change to the task element
        let newTaskCard = createTaskElement(task);
        taskCard.parentNode.replaceChild(newTaskCard, taskCard);
        saveTaskChanged();
    });
    newTaskDialog.showModal();
}


//remove task element from the container
export function removeTaskElement(task){
    let tasks = document.querySelectorAll(".task-item");
    for (let item of tasks){
        if (task.id === item.dataset.id){
            item.remove();
            task.completeTask();
            saveTaskChanged();
            // observer.remove("Complete Task", removeTaskElement);
            break;
        }
    }
}

