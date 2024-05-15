function ValidateEmail(mailAdress) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailAdress.match(mailformat)) {
        return true;
    } else {
        throw "You have entered an invalid email address!";
    }
}

function CheckPassword(password) {
    var psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
    if (password.match(psw)) {
        return true;
    } else {
        throw 'Wrong password...! The password must contain letters and numbers';
    }
}