const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const hbs = require("hbs");
const app = express();

const Pizza = require("./models/Pizza.model");


app.set("views", __dirname + "/views")//tell Express where is views located
app.set("view engine", "hbs")//sets HBS as template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials
//Make everything on public accessible
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to data base
mongoose
    .connect('mongodb://127.0.0.1:27017/pizza-restaurant')
    .then(x => {
        console.log(`Connected! Database name: "${x.connections[0].name}"`);
    })
    .catch(err => console.error('Error... ', err));


//homepage

app.get("/", (request, response, next) => {
    response.render("homepage")
})

//contact page

app.get("/contact", (request, response, next) => {
    response.render("contact")
})

app.get("/pizzas", (request, response, next) => {

    let maxPrice = request.query.maxPrice
    maxPrice = Number(maxPrice)

    let filter =  {}
    if(maxPrice){

        filter = {price: {$lte: maxPrice}}
    }

    Pizza.find(filter)
    .then((pizzasArr) => {

        const data = {
            listOfPizzas: pizzasArr
        }
        response.render("product-list", data)

    })
    .catch(e => console.log("No pizza"))
})


app.get("/pizzas/:pizzaName", (request, response, next) => {

    const pizzaName = request.params.pizzaName;
    Pizza.findOne({title: `${pizzaName}`})
    .then((pizzaDetails)=>{

        response.render("products", pizzaDetails)
    })
    .catch( e => console.log(`Error getting pizza ${pizzaName} from DB`))
});

app.post("/login", (request, response, next) => {
    console.log(request.body)
    const password = request.body.pwd

    if(password === "ilovepizza"){

        response.send("WELCOME!")
    }
    else {
        response.send("Sorry, not alowed!")
    }
})

app.listen(3000, () => console.log("My first app listening on port 3000"))

