import { observer } from "./observer";

export class Task{
    #title; //string
    #priority; //a number for prototyping
    #date;
    #description; // string
    #id;
    project;
    #htmlCard;
    constructor(title, date, priority){
        this.#title = title;
        this.#date = date;
        this.#priority = priority;
        this.#id = crypto.randomUUID();
    }

    set description(content){
        this.#description = content;
    }

    get description(){
        return this.#description;
    }

    get title(){
        return this.#title;
    }

    get priority(){
        return this.#priority;
    }

    get date(){
        return this.#date;
    }
    get id(){
        return this.#id;
    }

    completeTask = function(){
        observer.emit("Complete Task", this);
    }
}