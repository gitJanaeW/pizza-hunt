const {Schema, model} = require('mongoose');

// schema for the model
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

// declaring the creation of the model
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;