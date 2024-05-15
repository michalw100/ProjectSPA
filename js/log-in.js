document.querySelector("#okeyLog").addEventListener('click', login);

function login() {
    /*הכנס פרטי משתמש למשתנים*/
    let mail = document.getElementById("emailLog").value;
    let password = document.getElementById("passwordLog").value;
    /*אם לא מולאו כל הפרטים*/
    if (mail == "" || password == "") {
        alert("Not all details have been filled in");
    }
    else {
        try {
            ValidateEmail(mail)
            CheckPassword(password)
        }
        catch (message) {
            alert(message);
            return;
        }
        try {
            CheckPassword(password)
        }
        catch (message) {
            alert(message);
            return;
        }
        const newUser = new User("", mail, password);
        newUser.logIn();
    }
}