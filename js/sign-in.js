document.querySelector("#okeySign").addEventListener('click', saveUser);

function saveUser(e) {
    /*הכנס פרטי משתמש למשתנים*/
    let name = document.getElementById("nameSign").value;
    let mail = document.getElementById("emailSign").value;
    let password = document.getElementById("passwordSign").value;
    let password2 = document.getElementById("passwordSign2").value;
    /*אם לא מולאו כל הפרטים*/
    if (name == "" || mail == "" || password == "" || password2 == "") {
        alert("Not all details have been filled in");
    }
    else {
        //בדיקה אם הססמאות שוות
        if (password !== password2) {
            alert("The passwords are not the same");
            return;
        }
        try {
            ValidateEmail(mail);
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
        const newUser = new User(name, mail, password);
        newUser.signIn();
    }
}

