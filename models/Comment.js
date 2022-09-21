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
      type: String
    },
    writtenBy: {
      type: String
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
      type: String
    },
    commentBody: {
      type: String
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