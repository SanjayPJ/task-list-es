
// define ui variables

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clear_btn = document.querySelector('.btn-clear');
const filter = document.querySelector('#filter-task');
const taskInput = document.querySelector('#new-task');

//load all event listeners
loadEventListeners();

//load all event listener
function loadEventListeners(){

    //add task
    document.addEventListener('DOMContentLoaded', getTasks); 
    form.addEventListener('submit', addTask);
    tasklist.addEventListener('click', removeTask);
    clear_btn.addEventListener('click', removeAllTask);
    filter.addEventListener('keyup', filterTasks)

}

//add task function
function addTask(e){
    
    if(taskInput.value === ''){
        alert("add a task")
    }else{
        //create element
        const task_item = `<div class="alert alert-success alert-dismissible fade show mt-2 mb-0" role="alert"> <strong class="collection-item">${taskInput.value}</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true" id="close">&times;</span> </button></div>`;
        tasklist.innerHTML += task_item;
        
        // store in local storage
        storeTaksInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = "";
    }
    e.preventDefault();
}

function storeTaksInLocalStorage(task){
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(e){
    if(e.target.id == "close"){
        e.target.parentElement.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.parentElement);
    }
}
function removeAllTask(e){
    tasklist.innerHTML = "";
    clearAllTaksFromLocalStorage();
}
function filterTasks(e){
    // console.log(e.target.value.toLowerCase());
    // console.log(document.querySelectorAll('.collection-item'));

    const filter_text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(item){
        const item_text = item.textContent.toLowerCase();
        // console.log(item_text);
        if(item_text.indexOf(filter_text) != -1){
            item.parentElement.style.display = 'block';
        }else{
            item.parentElement.style.display = 'none';
        }
    });
}
function getTasks(){
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(item){
        //create element
        const task_item = `<div class="alert alert-success alert-dismissible fade show mt-2 mb-0" role="alert"> <strong class="collection-item">${item}</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true" id="close">&times;</span> </button></div>`;
        tasklist.innerHTML += task_item;
    });  
}
function removeFromLocalStorage(item){
    task = item.childNodes[1].textContent;
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task_,index){
        if(task == task_){
            tasks.splice(index,1);
        }    
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearAllTaksFromLocalStorage(){
    localStorage.clear();
}


