


//the function below adds elements to the list


let formInput = document.querySelector("#textInput");
let addButton = document.querySelector("#add-button");
let clearAllButton = document.querySelector("#clearAllButton");
let listOfTasks = document.querySelector("#list");
let selectTimeBox = document.querySelector("#timer");
let timer;
let deleteAllButton = document.querySelector("#deleteAllButton");



addButton.addEventListener("click", (e) => {
    e.preventDefault(); 

    //the condition below stopping from adding empty bullets to the list 
    if(formInput.value.trim() === ""){
        console.log(formInput.value);
        return
    } 

    //creating the elements for the list
    let newHr = document.createElement("hr");
    let newBullet = document.createElement("li");
    let newDiv = document.createElement("div");
    let newCheckBox = document.createElement("input");
    let newSpanText = document.createElement("span");
    let newTrashIcon = document.createElement("i");


    //adding classes and attributesto the elements
    newBullet.classList.add("taskToBeDone");
    newCheckBox.classList.add("checkbox");
    newTrashIcon.classList.add("fas", "fa-trash-alt");
    newDiv.classList.add("relative");


    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.setAttribute("value", " ");
    newCheckBox.setAttribute("name", "checkbox");

    // the event listener below listens too a change from the checkboxs 
    newCheckBox.addEventListener("change", crossEvent);


    //adding all elements to our list by appending them.
    newDiv.appendChild(newCheckBox);

    newDiv.appendChild(newSpanText);
    newSpanText.textContent = formInput.value;

    newDiv.appendChild(newTrashIcon);
    newBullet.appendChild(newDiv);
    listOfTasks.appendChild(newHr);
    listOfTasks.appendChild(newBullet);

    // the event listener below listens too a click from the trash can icons  
    newTrashIcon.addEventListener("click", deleteWithBinEvent);

})


// the event listener below listens too a click from the clear all completed tasks button
clearAllButton.addEventListener("click", deleteCheckedElements);

//the function below Crossing all the checkboxes that the user clicking on
function crossEvent(e){
    const targetInput = e.target;
    let span = targetInput.nextElementSibling;
    let spanLiParent = span.parentNode.parentNode;

    if (targetInput.checked) {
        span.classList.add("cross-off");
        spanLiParent.classList.remove("taskToBeDone");
    } else {
        span.classList.remove("cross-off");
        spanLiParent.classList.add("taskToBeDone");
    }
}

//the function below deleting all siblings that related to the event (when the trash can icons are click-on)
function deleteWithBinEvent(e){
    if(confirm("are you sure you want to delete?")){
        let li = e.target.parentNode.parentNode;
        li.previousElementSibling.remove();
        li.remove();
    }
}


//the function below deleting all elements that have the class Cross of when called
function deleteCheckedElements(){
    let crossetLi = document.querySelectorAll("span[class='cross-off']");

    for (let index = 0; index < crossetLi.length; index++) {
        let li = crossetLi[index].parentNode.parentNode; //li parent of the checked span
        li.previousElementSibling.remove();
        li.remove();
    }
}


//the event listener below listens too any changes on the select time countdown box
selectTimeBox.addEventListener("change", ()=>{
    //clear previous timer if exist
    clearTimeout(timer);
    if(Number(selectTimeBox.value) === 0){
        return;
    }
    //set new timeout
    timer = setTimeout(timeoutAlert, Number(selectTimeBox.value) * 60000);
})



//the function below countdown the time the user set to remind about the uncompleted tasks.
function timeoutAlert(){
    if(Number(selectTimeBox.value) === 0){
        return;
    }
    let uncompletedTasks = document.querySelectorAll(".taskToBeDone");
    //in case there iare unfinished tasks - alert
    if(uncompletedTasks.length >= 1){
        alert(`you still have ${uncompletedTasks.length} tasks to complete`); 
    }
    timer = setTimeout(timeoutAlert, Number(selectTimeBox.value) * 60000); // 1min = 1 * 60 sec  = 1 * 60 * 1000 millisec => 60000
}



//the event listener below listens too the delete all button (waiting for a click event), to delete all elements from the list.
deleteAllButton.addEventListener("click", ()=>{
    let liGroup = document.querySelectorAll("li");
    liGroup.forEach(element => {
        element.previousElementSibling.remove();
        element.remove();
    });
    
})
