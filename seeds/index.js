const sequelize = require('../config/connection');
const seedBlogPosts = require('./BlogpostData');
const seedComments = require('./CommentData');
const seedUsers = require('./UserData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedBlogPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
