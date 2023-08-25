const { mongoose, Schema } = require("mongoose");

const Pizza = require("./models/Pizza.model"); //imports Pizza model



mongoose.connect("mongodb://127.0.0.1:27017/pizza-restaurant")
    .then((response) => {
        console.log(`Connected! Database Name: ${response.connections[0].name}`)



        // create a new document (a new pizza)
        return Pizza.create({ 
        title: "margarita", 
        price: 12, 
        isVeggie: true, 
        dough: "classic", 
        size: "Medium", 
        ingredients: ["mostaza", "peperoni", "chocolate"],
        imageFile: "pizza-margarita.jpg",
    })


    })
    .then((pizzaFromDB) => {
        console.log(pizzaFromDB)

        const newPizzasArr = [
            {title: "veggie", price: 15, isVeggie: true},
            {title: "seafood", price: 20},
        ]
        return Pizza.insertMany(newPizzasArr);
    })
    .then((pizzasFromDB) => {
        console.log(`your ${pizzasFromDB.length} pizzas are ready!`)

        return Pizza.find()
    }) .then( (pizzasFromDB) => {
        console.log(`Number of pizzas in our DB: ${pizzasFromDB.length}`)

        // Model.findOneAndUpdate
        return Pizza.findOneAndUpdate({title: "margarita"}, {price: 12.5})
    })
    .then(()=>{
        console.log("Your pizza was updated")

       return Pizza.deleteMany({title: "seafood"})
    })

    .catch((err) => console.error("Error connecting to Mongo", err));


    