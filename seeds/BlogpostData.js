const { BlogPost } = require("../models");
 const bpSeedData = [
  {
    title: "Why I Love Code",
    content:
      "Coding is an incredibly creative process that allows me to bring my ideas to life. I love the feeling of solving a problem through code and creating something that can have a real impact on people's lives.",
    user_id: 1,
  },
  {
    title: "Getting Started with React",
    content:
      "React is a great library for building dynamic user interfaces. In this post, I'll walk you through the basics of creating a React app and building your first components.",
    user_id: 2,
  },
  {
    title: "Debugging Tips and Tricks",
    content:
      "Debugging code can be frustrating, but there are a few techniques that can make the process easier. In this post, I'll share some of my favorite tips and tricks for debugging code.",
    user_id: 3,
  },
];

 const seedBlogPosts = () => BlogPost.bulkCreate(bpSeedData);

 module.exports = seedBlogPosts;
