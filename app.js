const express = require("express");

const app = express();

app.use(express.static('public'));

//homepage

app.get("/", (request,response, next) => {
    response.sendFile(__dirname + '/views/homepage.html')
})

//contact page

app.get("/contact", (request, response, next) => {
    response.sendFile(__dirname + '/views/contact.html')
})

app.listen(3000, () => console.log("My first app listening on port 3000"))