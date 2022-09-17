const {Pizza} = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    // get one pizza by id
    getPizzaById({params}, res) {
        Pizza.findOne({_id: params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No pizza found with this id'});
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // create pizza
    createPizza({body, res}) {
        Pizza.create(body)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },
    // update pizza by id
    updatePizza({params, body}, res) {
        // 'new: true' instructs mongoose to return the new updated data, not the original pre-update
        Pizza.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No pizza found with this id'});
                return;
            }
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },
    // delete pizza
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
        .then(data => {
            if (!data) {
                res.status(404).json(err);
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}

module.exports = pizzaController;