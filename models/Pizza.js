const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// schema for the model
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: 'Pizza name is not provided',
      trim: true
    },
    createdBy: {
      type: String,
      required: 'Pizzamaker name is not provided',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get is a getter that will use the dateFormat function provided to format the date
      get: createdAtVal => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true,
      // 
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
      virtuals: true, // Virtuals automatically return an id. To turn this off, set virtuals to false
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  // using the reduce() JS array method to tally up the total of every comment with its replies
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;