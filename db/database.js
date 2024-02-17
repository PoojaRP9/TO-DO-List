const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://poojapal88286:HySLFoY0Z2CbfC8P@cluster0.axp5ppd.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("database connected");
}).catch(() => {
    console.log("Database Error");
})