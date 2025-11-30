import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import { openNewTaskForm } from "./DOM/todoDOM";
import { addNewProject} from "./DOM/projectDOM";
let newTaskBtn = document.querySelector(".new-task-btn");
newTaskBtn.addEventListener("click", e => openNewTaskForm());
let newProjectBtn = document.querySelector(".new-prj-btn");
newProjectBtn.addEventListener("click", e => addNewProject());
