import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import { openNewTaskForm } from "./TodoItemManager";
let addTaskBtn = document.querySelector(".new-task-btn");
addTaskBtn.addEventListener("click", e => openNewTaskForm());


