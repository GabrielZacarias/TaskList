/*********************
    get html tags
**********************/
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



/*********************
    event listeners
**********************/
function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', clearTasks);

    filterInput.addEventListener('keyup', filterTasks);
}

loadEventListeners();



/*********************
    UI methods
**********************/
function getTasks(){
    let tasks = [];

    if(localStorage.getItem('tasks') !== null)
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task){
        const li = document.createElement('li');

        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        //create x marker
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-times"></i>';
        link.style.cursor = 'pointer';
        
        //add task to ui
        li.appendChild(link);

        taskList.appendChild(li);
    })
}

function addTask(e){

    if(taskInput.value === '')
        alert('A task must be added');

    const li = document.createElement('li');

    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-times"></i>';
    link.style.cursor = 'pointer';
    
    //add task to ui
    li.appendChild(link);

    taskList.appendChild(li);

    //add to local storage
    storeLocally(taskInput.value);
    
    //clear input
    taskList.value = '';

    e.preventDefault();
}


function removeTask(e){
    //target the icon instead of list and remove
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm("Are you sure you want to remove task?"))
        {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


function clearTasks(){
    //faster than innerHTML
    while(taskList.firstChild)
        taskList.removeChild(taskList.firstChild);

    clearTasksFromLocalStorage();
}


function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item = task.firstChild.textContent;

        if(item.toLocaleLowerCase().indexOf(text) != -1)
            task.style.display = 'block';
        else
            task.style.display = 'none';
    });
}




/*********************
    local storage methods
**********************/


function storeLocally(task){
    let tasks = [];

    if(localStorage.getItem('tasks') !== null)
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.push(task);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTaskFromLocalStorage(taskItem){
    let tasks = [];

    if(localStorage.getItem('tasks') !== null)
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasksFromLocalStorage(){
    localStorage.clear();
}