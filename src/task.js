import { observer } from "./Tools/observer";
import { saveTaskChanged } from "./Manager/projectManager";
export class Task{
    title; //string
    priority; //a number for prototyping
    date;
    description; // string
    id;
    constructor(title, date, priority, description){
        this.title = title;
        this.date = date;
        this.priority = priority;
        this.description = description;
        this.id = crypto.randomUUID();
    }
}

Task.prototype.completeTask = function(){
    console.log("complete");
    observer.emit("Complete Task", this);
    saveTaskChanged();
}