function getUser(user) //מחזירה את המשתמש שהתקבל
{
  return localStorage.getItem(user.email);
}

function setUser(user) //מעדכנת ושומרת את המשתמש שהתקבל
{
  localStorage.setItem(user.email, JSON.stringify(user));
}

function getTasks(mailUser) //מחזירה את המטלות של המשתמש הנוכחי
{
  return JSON.parse(localStorage.getItem(mailUser)).tasks;
}

function setTasks(allTask, mailUser) //שמירת מערך המטלות
{
  let thisUser = JSON.parse(localStorage.getItem(mailUser));
  thisUser.tasks = allTask;
  localStorage.setItem(mailUser, JSON.stringify(thisUser));
}

function userSignInDB(user) {
  let data = JSON.parse(user);
  let userData = JSON.parse(getUser(data));
  if (!userData) {
    data.isConnect = true;
    setUser(data);
    return true;
  }
  return true;
}

function userLogInDB(user) {
  let data = JSON.parse(user);
  let userData = JSON.parse(getUser(data));
  if (userData) {
    if (userData.password === JSON.parse(user).password) {
      userData.isConnect = true;
      setUser(userData);
      return 200;
    }
    return 404; //email or password is incorrect;
  }
  return 400; //You are not registered, you must register;
}

function addTaskDB(mailUser, task) {
  let dataTask = JSON.parse(task);
  dataTask.idTask = doIdTask();
  let allTask = getTasks(mailUser);
  for (let i = 0; i < allTask.length; i++) {
    if (allTask[i].dateTask === dataTask.dateTask && allTask[i].timeTask === dataTask.timeTask) {
      return false; //יש כזאת מטלה באותו הזמן
    }
  }
  allTask.push(dataTask);
  setTasks(allTask, mailUser);
  return true;
}

function deleteTaskDB(mailUser, idUpdate) {
  let tasks = getTasks(mailUser);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].idTask == idUpdate) {
      tasks.splice(i, 1);
      setTasks(tasks, mailUser);
      break;
    }
  }
  return true;
}

function updateTaskDB(mailUser, task, idUpdate) {
  let dataTask = JSON.parse(task);
  let tasks = getTasks(mailUser);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].idTask == idUpdate) {
      tasks[i] = dataTask;
    }
  }
  setTasks(tasks, mailUser);
  return true;
}

function doneTaskDB(mailUser, task) {
  let dataTask = JSON.parse(task);
  let tasks = getTasks(mailUser);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].idTask == dataTask.idTask) {
      tasks[i].doneTask = true;
    }
  }
  setTasks(tasks, mailUser);
  return true;
}

function doIdTask() //מעדכן את הקוד של המטלה
{
  let idTask;
  if (!localStorage.getItem('idTask')) {
    localStorage.setItem('idTask', 1);
    idTask = 1;
  }
  else {
    idTask = JSON.parse(localStorage.getItem('idTask')) + 1;
    localStorage.setItem('idTask', idTask);
  }
  return idTask;
}