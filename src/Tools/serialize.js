export function replacer(key, value){
    if (typeof value === "function") {
        return "/Function(" + String(value) + ")/";
    }
    return value;
}

// check if a property has function pattern to convert it back to function when parsing json

const rexFunction = /^\/Function\(.*\)\/$/s;
export function reviver(key, value){
    if (typeof value === "string" && rexFunction.test(value)) {
        const functionText = value.substring(10, value.length - 2);
        return (0, eval)("(" + functionText + ")");
    }
    return value;
}
