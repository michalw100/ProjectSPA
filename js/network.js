function clientToServer(fajax) {
    setTimeout(() => {
        server(fajax);
        fajax.onload();
    }, 100);
    console.log("network");
}