import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import { openNewTaskForm } from "./Manager/todoDOM";
import { addNewProject} from "./Manager/projectDOM";
let newTaskBtn = document.querySelector(".new-task-btn");
newTaskBtn.addEventListener("click", e => openNewTaskForm());
let newProjectBtn = document.querySelector(".new-prj-btn");
newProjectBtn.addEventListener("click", e => addNewProject());
