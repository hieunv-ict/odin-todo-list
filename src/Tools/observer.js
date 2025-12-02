//implementing observer pattern to decouple modules
let observer = {
    events: {},
    add: function(eventName, func){
        this.events[eventName] = this.events[eventName] || [];
        if (!this.checkDuplicateFunc(eventName, func)){
            this.events[eventName].push(func);
        }
        
    },

    remove: function(eventName, func){
        for (let i = 0; i < this.events[eventName]; i++){
            if (this.events[eventName][i] === func){
                this.events[eventName].splice(i,1);
                break;
            }
        }
    },

    emit: function(eventName, data){
        if (this.events[eventName])
        for (let func of this.events[eventName]){
            func(data);
        }
    },

    checkDuplicateFunc: function(eventName, func){
        for (let i = 0; i < this.events[eventName]; i++){
            if (this.events[eventName][i] === func){
                return true;
            }
        }
        return false;
    }
}

export {observer};