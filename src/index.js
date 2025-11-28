import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import { openNewTaskForm } from "./todoItemManager";
import { addNewProject } from "./projectManager";
let newTaskBtn = document.querySelector(".new-task-btn");
newTaskBtn.addEventListener("click", e => openNewTaskForm());

let newProjectBtn = document.querySelector(".new-prj-btn");
newProjectBtn.addEventListener("click", e => addNewProject());
