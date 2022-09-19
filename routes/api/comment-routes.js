const router = require('express').Router();
const {addComment, removeComment} = require('../../controllers/comment-controller');

// for getting a pizza by its id
router.route('/:pizzaId').post(addComment);
// for deleting a comment by its pizza id & comment id
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;