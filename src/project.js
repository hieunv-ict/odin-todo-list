import { observer } from "./observer";

export class Project{
    #taskList;
    #name;
    constructor(name){
        this.#taskList = new Array();
        this.#name = name;
    }
    get taskList(){
        return this.#taskList;
    }
    addTask = function(task){
        this.#taskList.push(task);
    }
    removeTask = function(tasktoRemove){
        for (let i = 0; i < this.#taskList.length; i++){
            if (this.#taskList[i].id === tasktoRemove.id){
                this.#taskList.splice(i, 1);
                observer.remove("Complete Task", this.removeTask);
            }
        }
    }
    get prjName(){
        return this.#name;
    }
}