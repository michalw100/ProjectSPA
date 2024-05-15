class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tasks = [];
        this.isConnect = false;
    }

    signIn() {
        const fajax = new FXMLHttpRequest();
        let url = "https://a&m.com/api/sign-in";
        fajax.open('POST', url);
        fajax.onload = function () {
            if (fajax.status == 200) {
                JSON.parse(this.data).isConnect = true;
                localStorage.setItem('currentUser', JSON.parse(this.data).email);
                history.pushState({}, 'tasks', '#tasks');
                app.poppin();
            }
            else {
                if (fajax.status == 404) {
                    alert("The passwords are not the same");
                }
                if (fajax.status == 400) {
                    alert("User exists");
                }
            }
        };
        fajax.send(JSON.stringify(this));
    }

    logIn() {
        const fajax = new FXMLHttpRequest();
        let url = "https://a&m.com/api/log-in";
        fajax.open('POST', url);
        fajax.onload = function () {
            if (fajax.status == 200) {
                JSON.parse(this.data).isConnect = true;
                localStorage.setItem('currentUser', JSON.parse(this.data).email);
                history.pushState({}, 'tasks', '#tasks');
                app.poppin();
            }
            else {
                if (fajax.status == 404) {
                    alert("email or password is incorrect");
                }
                if (fajax.status == 400) {
                    alert("You are not registered, you must register");
                }
            };
        }
        fajax.send(JSON.stringify(this));
    }
}
