class FXMLHttpRequest {
   constructor() {
      this.url = '';
      this.response = '';
      this.type = '';
      this.data = '';
      this.status = '';
      this.onload = '';
      this.headers = '';
   }
   open(type, url) {
      this.type = type;
      this.url = url;
   }
   send(newdata = null) {
      this.data = newdata;
      clientToServer(this);
      console.log("fajax")
   }
}
