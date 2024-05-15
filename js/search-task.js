loaded();
//מביאה את כל המטלות כולם ברגע שמגיעים לעמוד הזה
function loaded() {
    let taskDiv = document.querySelector('#container1');
    taskDiv.innerHTML = "";
    searchTasks = [];
    let fajax = new FXMLHttpRequest();
    let url = `https://a&m.com/api/all-tasks`;
    fajax.open('GET', url);
    let MailOfUser = localStorage.getItem("currentUser");
    fajax.headers = {
        "email": MailOfUser
    }
    fajax.onload = function () {
        for (let i = 0; i < fajax.response.length; i++) {
            searchTasks.push(fajax.response[i]);
            let currentTask = getTaskDOM(searchTasks[i]);
            taskDiv.insertAdjacentHTML('beforeend', currentTask);
            if (fajax.response[i].doneTask == true) {
                console.log(fajax.response[i].idTask);
                console.log(document.getElementById(fajax.response[i].idTask));
                document.getElementById(fajax.response[i].idTask).style.visibility = "hidden";
            }
            const task = new Task(fajax.response[i].nameTask, fajax.response[i].dateTask, fajax.response[i].timeTask, fajax.response[i].noteTask, fajax.response[i].idTask);
            let btn = document.querySelectorAll(`#task${task.idTask} button`);
            btn[0].addEventListener('click', task.doneTasks.bind(task));
            btn[1].addEventListener('click', task.deleteTask.bind(task));
            btn[2].addEventListener('click', task.beforeUpdateTask.bind(task));
            //הפעולה search שמתרחשת ברגע שלחצנו על חיפוש מטלה
        }
    }
    fajax.send(JSON.stringify(fajax));
}

//הפעולה search שמתרחשת ברגע שלחצנו על חיפוש מטלה
document.querySelector("#search").addEventListener("click", function (e) {
    let nameSearchTask = document.querySelector("#nameSearch").value;
    let dateSearchTask = document.querySelector("#dateSearch").value;
    let doneYes = document.querySelector("#doneYes").checked;
    let doneNo = document.querySelector("#doneNo").checked;
    let taskDiv = document.querySelector('#container1');
    taskDiv.innerHTML = "";
    for (let i = 0; i < searchTasks.length; i++) {
        if (doneYes && !searchTasks[i].doneTask) {
            continue;
        }
        if (doneNo && searchTasks[i].doneTask) {
            continue;
        }
        if (nameSearchTask !== "" && searchTasks[i].nameTask !== nameSearchTask) {
            continue;
        }
        if (dateSearchTask !== "" && searchTasks[i].dateTask !== dateSearchTask) {
            continue;
        }
        let currentTask = getTaskDOM(searchTasks[i]);
        taskDiv.insertAdjacentHTML('beforeend', currentTask);
        if (searchTasks[i].doneTask == true) {

            document.getElementById(searchTasks[i].idTask).style.visibility = "hidden";
        }
        const task = new Task(searchTasks[i].nameTask, searchTasks[i].dateTask, searchTasks[i].timeTask, searchTasks[i].noteTask, searchTasks[i].idTask);
        let btn = document.querySelectorAll(`#task${task.idTask} button`);
        btn[0].addEventListener('click', task.doneTasks.bind(task));
        btn[1].addEventListener('click', task.deleteTask.bind(task));
        btn[2].addEventListener('click', task.beforeUpdateTask.bind(task));
    }
});


function getTaskDOM(task) {
    return `<section id="task${task.idTask}">
            <div class="container-task">
            <input type="hidden" id="taskId${task.idTask}" value="${task.idTask}">
            <header>${task.nameTask}</header>
            <label> <strong>Date:</strong> ${task.dateTask}</label><br>
            <label> <strong>Hour:</strong> ${task.timeTask}</label><br>
            <label> <strong>Note:</strong> ${task.noteTask}</label><br>
            <button type="button" class = "button buttonDoneTask" id="${task.idTask}">Done</button>
            <button type="button" class = "button buttonDeleteTask" id="${task.idTask}">Remove</button>
            <button type="button" class = "button buttonUpdateTask" id="${task.idTask}">Update</button>
            </div>
            </section>`;
}