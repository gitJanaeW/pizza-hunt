const {Comment, Pizza} = require('../models');

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
      console.log(body);
      Comment.create(body)
       // update the pizza with a new comment
        .then(({ _id }) => {
          return Pizza.findOneAndUpdate(
            { _id: params.pizzaId },
            // all Mongo methods start with a $. This Mongo method works the same as a JS push() function
            { $push: { comments: _id } },
            { new: true }
          );
        })
        // respond with new pizza data
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },
    // remove comment
    removeComment({ params }, res) {
      Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
          if (!deletedComment) {
            return res.status(404).json({ message: 'No comment with this id!' });
          }
          return Pizza.findOneAndUpdate(
            { _id: params.pizzaId },
            { $pull: { comments: params.commentId } },
            { new: true }
          );
        })
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;