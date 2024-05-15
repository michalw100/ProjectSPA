const app = {
    init: function () {
        let opentemplate = document.querySelector("#log-in").content;
        const contentdiv = document.querySelector('#content');
        contentdiv.replaceChildren(opentemplate.cloneNode(true));
        history.replaceState({}, 'log-in', '#log-in');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        if (currentPage == 'log-in') {
            let userData = (localStorage.getItem('currentUser'));
            let user = JSON.parse(localStorage.getItem(userData));
            user.isConnect = false;
            localStorage.setItem(user.email, JSON.stringify(user));
        }
        let opentemplate = document.querySelector(`#${currentPage}`).content;
        const contentdiv = document.querySelector('#content');
        contentdiv.replaceChildren(opentemplate.cloneNode(true));
        history.pushState({}, currentPage, `#${currentPage}`);
    },
    poppin: function (ev) {
        let hash = location.hash.replace('#', '');
        let userData = (localStorage.getItem('currentUser'));
        let user = JSON.parse(localStorage.getItem(userData));
        if (!user) { user = {} }
        if (!user.isConnect && hash != 'log-in' && hash != 'sign-in')//אם מנסים להכנס מעמוד אחר
         {
            hash = 'log-in';
            history.replaceState({}, 'log-in', '#log-in');
        }
        if (!user.isConnect && hash == 'log-in') // אם הוא לא מחובר אי אפשר לחזור לעמוד הקודם
         {
            hash = 'log-in';
            history.replaceState({}, 'log-in', '#log-in');
        }
        let template = document.getElementById(hash).content;
        const div = document.querySelector('#content');
        div.replaceChildren(template.cloneNode(true));

        if (hash == 'tasks') {
            app.navLink();
        }
    },
    navLink: function () {
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        });
    }
}
document.addEventListener('DOMContentLoaded', app.init());