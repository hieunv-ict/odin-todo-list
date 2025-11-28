import { Task } from "./task";

let newTaskDialog = document.querySelector(".new-task-dialog");
let addTaskForm = newTaskDialog.querySelector(".new-task-form");
let cancelBtn = addTaskForm.querySelector(".cancel-btn");
// cancel button clicked -> close the dialog and not create new task
cancelBtn.addEventListener("click", e =>{e.preventDefault(); newTaskDialog.close()});
 // submit button clicked with all input filled -> create new task 
addTaskForm.addEventListener("submit", e =>{
    let newTaskElem = addTaskForm.querySelectorAll(".input");
    let i = 0;
    for (let item of newTaskElem){
        console.log(item.value);
    }
});
// open form for adding task
export function openNewTaskForm(){
    // open dialog form
    newTaskDialog.showModal();
}
//create task
function createToDoItem(title, date, priority, description){
    
    
    let taskTitle = addTaskForm.querySelector("#task-title");
    let taskPriority = addTaskForm.querySelector("#task-priority");
    let taskDate = addTaskForm.querySelector("#task-date");
    let taskDesc = addTaskForm.querySelector("#task-description");
}