import { displayData } from "../DOM/projectDOM";
import { projectList } from "../Manager/projectManager";
import { observer } from "./observer";
import { setProjectList } from "../Manager/projectManager";
import { Project } from "../project";
import { DEFAULT_PROJECT_NAME } from "../Manager/projectManager";
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
    observer.add("Save Data", saveChange);
    let jsonStr = localStorage.getItem("projects") || null;
    let projects = JSON.parse(jsonStr);
    let len = Object.keys(projects).length || 0;
    if (len === 0){
        let defaultProject = new Project(DEFAULT_PROJECT_NAME);
        projectList[DEFAULT_PROJECT_NAME] = defaultProject;
        populateStorage(projectList);
    }
    else{
        deserialize();
    }
    
    displayData();
}

function populateStorage(dict){
    let jsonVal = JSON.stringify(dict);
    localStorage.setItem("projects", jsonVal);
}

function saveChange(projects){
  localStorage.clear();
  populateStorage(projects);
}


function deserialize(){
  let jsonText = localStorage.getItem("projects");
  let projects = JSON.parse(jsonText);
  setProjectList(projects);

}
