const router = require('express').Router();
const {addComment, removeComment, addReply, removeReply} = require('../../controllers/comment-controller');
console.log(addComment);

// for getting a pizza by its id
router.route('/:pizzaId').post(addComment);
// for deleting a comment by its pizza id & comment id
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);
// for deleteing replies
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;