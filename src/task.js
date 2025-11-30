import { observer } from "./Tools/observer";

export class Task{
    #title; //string
    #priority; //a number for prototyping
    #date;
    #description; // string
    #id;
    project;
    #htmlCard;
    constructor(title, date, priority, description){
        this.#title = title;
        this.#date = date;
        this.#priority = priority;
        this.#description = description;
        this.#id = crypto.randomUUID();
    }

    get description(){
        return this.#description;
    }
    set description(desc){
        this.#description = desc;
    }

    get title(){
        return this.#title;
    }
    set title(val){
        this.#title = val;
    }

    get priority(){
        return this.#priority;
    }
    set priority(val){
        this.#priority = val;
    }

    get date(){
        return this.#date;
    }
    set date(val){
        this.#date = val;
    }
    get id(){
        return this.#id;
    }

    completeTask = function(){
        observer.emit("Complete Task", this);
    }
}