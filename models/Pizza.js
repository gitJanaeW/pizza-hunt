const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
        default: Date.now,
        // get is a getter that will use the dateFormat function provided to format the date
        get: createdAtVal => dateFormat(createdAtVal)
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
        virtuals: true, // Virtuals automatically return an id. To turn this off, set id to false
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );
  
  // get total count of comments and replies on retrieval
  PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  });
  
  const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;