const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    // set custom id to distinguish it from its parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      trim: true,
      required: 'Reply body is empty'
    },
    writtenBy: {
      type: String,
      required: 'Username is not provided'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'Username is not provided'
    },
    commentBody: {
      type: String,
      trim: true,
      required: 'Comment body is empty'
    },
    replies: [ReplySchema], // this will nest the entire Reply object in the comment object
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;