const { Comment } = require("../models");
 const commentSeedData = [
  {
    content: "Great post! I totally agree with you.",
    user_id: 4,
    blogpost_id: 1,
  },
  {
    content: "Thanks for the helpful tutorial. I'm excited to start working with React!",
    user_id: 5,
    blogpost_id: 2,
  },
  {
    content: "These tips are a lifesaver. Thanks for sharing!",
    user_id: 6,
    blogpost_id: 3,
  },
];

 const seedComments = () => Comment.bulkCreate(commentSeedData);
 
 module.exports = seedComments;