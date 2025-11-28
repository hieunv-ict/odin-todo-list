export class Task{
    #title; //string
    #priority; //a number for prototyping
    #date;
    #description; // string
    constructor(title, date, priority){
        this.#title = title;
        this.#date = date;
        this.#priority = priority;
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

    get taskDate(){
        return this.#date;
    }
}