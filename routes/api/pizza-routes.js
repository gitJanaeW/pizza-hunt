const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza, 
    deletePizza
} = require('../../controllers/pizza-controllers');

// Set up get all and post at /api/pizza
router.route('')
    .get(getAllPizza)
    .post(createPizza);

// Set up get one, put and delete at /api/pizzaz/:id
router.route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;