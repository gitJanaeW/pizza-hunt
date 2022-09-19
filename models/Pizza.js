const {Schema, model} = require('mongoose');

// schema for the model
const PizzaSchema = new Schema(
    {
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
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false // Virtuals automatically return an id. To turn this off, set id to false
    }
);

PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// declaring the creation of the model
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;