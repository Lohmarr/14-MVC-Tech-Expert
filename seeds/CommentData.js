const { Comment } = require('../models');
 const commentData = [
  {
    comment_text: 'This is a great blog post!',
    user_id: 1,
    blog_post_id: 1
  },
  {
    comment_text: 'I found this post really informative. Thanks!',
    user_id: 2,
    blog_post_id: 1
  },
  {
    comment_text: 'I disagree with some of the points made in this post.',
    user_id: 3,
    blog_post_id: 2
  }
];

 const seedComments = () => Comment.bulkCreate(commentData);
 
 module.exports = seedComments;