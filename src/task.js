import { observer } from "./Tools/observer";

export class TodoTask{
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

TodoTask.prototype.completeTask = function(){
    observer.emit("Complete Task", this);
}