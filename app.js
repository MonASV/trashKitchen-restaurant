const express = require("express");

const app = express();

app.set("views", __dirname + "/views")//tell Express where is views located
app.set("view engine", "hbs")//sets HBS as template engine

//Make everything on public accessible
app.use(express.static('public'));

//homepage

app.get("/", (request, response, next) => {
    response.render("homepage")
})

//contact page

app.get("/contact", (request, response, next) => {
    response.render("contact")
})

app.get("/pizzas/margarita", (request, response, next) => {

    const dataMargarita = {
        title: 'Pizza Margarita',
        price: '',
        recommendedDrink: 'beer',
        imageFile: 'pizza-margarita.jpg',
        
        ingredients: [
            {
                ingredientName: "mozzarella",
                calories: 400
            },
            {
                ingredientName: "tomato sauce",
                calories: 200
            },
            {
                ingredientName: "basilicum",
                calories: 30
            },
          ],
    };


    response.render("products", dataMargarita)
})

app.get("/pizzas/veggie", (request, response, next) => {

    const dataVeggie = {
        title: 'Veggie Pizza',
        price: 15,
        recommendedDrink: 'power smoothie',
        imageFile: 'pizza-veggie.jpg',
        
        ingredients: [
            {
                ingredientName: "cherry tomatoes",
                calories: 400
            },
            {
                ingredientName: "basilicum",
                calories: 30
            },
            {
                ingredientName: "olives",
                calories: 300
            },
          ],
    };

    response.render("products", dataVeggie)
})

app.get("/pizzas/seafood", (request, response, next) => {

    const dataSeafood = {
        title: 'Seafood Pizza',
        price: 20,
        recommendedDrink: 'white wine',
        imageFile: 'pizza-seafood.jpg',
        
    };

    response.render("products", dataSeafood)
})


app.listen(3000, () => console.log("My first app listening on port 3000"))