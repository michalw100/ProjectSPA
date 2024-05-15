let searchTasks = [];
class Task {
    constructor(nameTask, dateTask, timeTask, noteTask, idTask = 0) {
        this.idTask = idTask;
        this.nameTask = nameTask;
        this.dateTask = dateTask;
        this.timeTask = timeTask;
        this.noteTask = noteTask;
        this.doneTask = false;
    }

    addTask(id = 0) {
        const fajax = new FXMLHttpRequest();
        let url;
        if (!id) {
            url = `https://a&m.com/api/add-task`;
            fajax.open('POST', url);
            let MailOfUser = localStorage.getItem("currentUser");
            fajax.headers = {
                "email": MailOfUser
            }
        }
        else {
            url = `https://a&m.com/api/update-task/?${id}`;
            fajax.open('PUT', url);
            let MailOfUser = localStorage.getItem("currentUser");
            fajax.headers = {
                "email": MailOfUser
            }
        }
        fajax.onload = function () {
            if (fajax.status == 200) {
                return;
            }
            if (fajax.status == 400) {
                alert("You have another task for this time");
            }
        }
        fajax.send(JSON.stringify(this));
    }

    deleteTask() {
        if (confirm("Are you sure you want to remove a task?")) {
            const fajax = new FXMLHttpRequest();
            let url = `https://a&m.com/api/delete-task/?${this.idTask}`;
            fajax.open('DELETE', url);
            let MailOfUser = localStorage.getItem("currentUser");
            fajax.headers = {
                "email": MailOfUser
            }
            fajax.onload = function () {
                if (fajax.status == 200) {
                    history.pushState({}, 'tasks', '#tasks');
                    app.poppin();
                }
            }
            fajax.send(JSON.stringify(this));
        }
    }

    beforeUpdateTask() {
        let idTask = this.idTask;
        let nameTask = this.nameTask;
        let dateTask = this.dateTask;
        let timeTask = this.timeTask;
        let noteTask = this.noteTask;
        history.pushState({}, 'add-task', '#add-task');
        app.poppin();
        fillData(nameTask, dateTask, timeTask, noteTask, idTask);
    }

    doneTasks() {
        const fajax = new FXMLHttpRequest();
        let url = `https://a&m.com/api/done-task`;
        fajax.open('PUT', url);
        let MailOfUser = localStorage.getItem("currentUser");
        fajax.headers = {
            "email": MailOfUser
        }
        fajax.onload = function () {
            if (fajax.status == 200) {
                JSON.parse(this.data).doneTask = true;
                document.getElementById(JSON.parse(this.data).idTask).style.visibility = "hidden";
                loaded();
            }
        }
        fajax.send(JSON.stringify(this));
    }

}

function fillData(nameTask, dateTask, timeTask, noteTask, idTask) {
    //על מנת למלא את הנתונים של המטלה בעדכון
    document.querySelector("#nameTask").value = nameTask;
    document.querySelector("#dateTask").value = dateTask;
    document.querySelector("#timeTask").value = timeTask;
    document.querySelector("#textTask").value = noteTask;
    document.querySelector("#addTasks").querySelector("h1").innerHTML = "Update task";
    document.querySelector("#addTasks").querySelector("#add").innerHTML = "Update";
    //כדי לדעת מה המזהה של המטלה שאותה אני משנה כי אני לא יכולה לשלוח את המטלה לפעולת אדאוונט
    document.querySelector("#taskId").value = idTask;
}

function addTheTask(e) {
    let newOrUpdatedTask;
    let nameTask = document.querySelector("#nameTask").value;
    let dateTask = document.querySelector("#dateTask").value;
    let timeTask = document.querySelector("#timeTask").value;
    let textTask = document.querySelector("#textTask").value;
    if (nameTask == "" || dateTask == "" || timeTask == "" || textTask == "") {
        alert("Not all details have been filled in");
        return;
    }
    newOrUpdatedTask = new Task(nameTask, dateTask, timeTask, textTask);
    let idInForm = JSON.parse(document.querySelector("#taskId").value);
    if (idInForm != -1) {//it is update
        newOrUpdatedTask.idTask = idInForm;
        idInForm = -1;//for next time - maybe it will be add and the value should be -1
    }
    newOrUpdatedTask.addTask(newOrUpdatedTask.idTask);
    history.pushState({}, 'tasks', '#tasks');
    app.poppin();
}