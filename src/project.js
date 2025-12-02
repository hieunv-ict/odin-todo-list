import { observer } from "./Tools/observer";

export class Project{
    taskList;
    name;
    constructor(name){
        this.taskList = new Array();
        this.name = name;
    }
}

Project.prototype.addTask = function(task){
    this.taskList.push(task);
}

Project.prototype.removeTask = function(tasktoRemove){
    let taskname = String(tasktoRemove.title);
    for (let i = 0; i < this.taskList.length; i++){
        if (this.taskList[i].id === tasktoRemove.id){
            this.taskList.splice(i, 1);
            return;
            // observer.remove("Complete Task", this.removeTask);
        }
    }
}