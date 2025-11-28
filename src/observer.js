//implementing observer pattern to decouple modules
export let observer = {
    events: {},
    add: function(eventName, func){
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(func);
    },

    remove: function(eventName, func){
        for (let i = 0; i < this.events[eventName]; i++){
            if (this.events[eventName][i] === func){
                this.events[eventName].splice(i,1);
                console.log(this.events[eventName]);
                break;
            }
        }
    },

    emit: function(eventName, data){
        console.log("emit");
        if (this.events[eventName])
        for (let func of this.events[eventName]){
            func(data);
        }
    }
}