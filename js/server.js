function server(fajax) {
    let url = fajax.url;
    let goto = url.split('/')[4];
    if (goto === 'sign-in' && fajax.type == 'POST') {
        userSignIn(fajax.data);
    }
    else if (goto === 'log-in' && fajax.type == 'POST') {
        userLogIn(fajax.data);
    }
    else if (goto === 'add-task' && fajax.type == 'POST') {
        addTask(fajax.data);
    }
    else if (goto === 'delete-task' && fajax.type == 'DELETE') {
        let idUpdate = url.split('?')[1];
        deleteTask(idUpdate);
    }
    else if (goto === 'update-task' && fajax.type == 'PUT') {
        let idUpdate = url.split('?')[1];
        updateTask(fajax.data, idUpdate);
    }
    else if (goto === 'done-task' && fajax.type == 'PUT') {
        doneTask(fajax.data);
    }
    else if (goto === 'all-tasks' && fajax.type == 'GET') {
        allTask();
    }

    function userLogIn(user) {
        let status = userLogInDB(user);
        if (status == 200) {
            fajax.status = 200;
        }
        else if (status == 404) {
            fajax.status = 404;
        }
        else{
            fajax.status = 400;
        }
    }

    function userSignIn(user) {
        if (userSignInDB(user)) {
            fajax.status = 200;
        }
        else {
            fajax.status = 400;
        }
    }

    function addTask(task) {
        if(addTaskDB(fajax.headers["email"], task)){
            fajax.status = 200;
        }
        else{
            fajax.status = 400;
        }
    }

    function deleteTask(idUpdate) {
        if(deleteTaskDB(fajax.headers["email"], idUpdate)){
            fajax.status = 200;
        }
        else{
            fajax.status = 400;
        }
    }

    function updateTask(task, idUpdate) {
        updateTaskDB(fajax.headers["email"], task, idUpdate);
        fajax.status = 200;
    }

    function doneTask(task) {
       if(doneTaskDB(fajax.headers["email"] ,task))
        fajax.status = 200;
    }

    function allTask() {
        fajax.status = 200;
        fajax.response = getTasks(fajax.headers["email"]);
    }
}
