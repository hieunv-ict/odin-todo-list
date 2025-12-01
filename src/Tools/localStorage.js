import { displayData } from "../DOM/projectDOM";
import { projectList } from "../Manager/projectManager";
import { observer } from "./observer";
import { setProjectList } from "../Manager/projectManager";
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function loadLocalStorage(){
    if (storageAvailable("localStorage")){
        //load data of todos and projects
        loadData();
    }
    else{
        console.log("No local storage");
    }
}

function loadData(){
    observer.add("Save Data", populateStorage);
    if (!localStorage.getItem("projects")){
        populateStorage(projectList);
    }
    else{
        setData();
    }
}

function populateStorage(data){
    let jsonData = JSON.stringify(data);
    localStorage.setItem("projects", jsonData);
}

function setData(){
    let jsonText = localStorage.getItem("projects");
    let tmpList = JSON.parse(jsonText);
    setProjectList(tmpList);
    displayData();
}