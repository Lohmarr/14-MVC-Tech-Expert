const { User } = require("../models");
 const userSeedData = [
  {
    username: "john_doe",
    email: "john_doe@example.com",
    password: "password123",
  },
  {
    username: "jane_doe",
    email: "jane_doe@example.com",
    password: "password456",
  },
  {
    username: "alex_smith",
    email: "alex_smith@example.com",
    password: "password789",
  },
  {
    username: "sarah_jones",
    email: "sarah_jones@example.com",
    password: "password123",
  },
  {
    username: "mike_brown",
    email: "mike_brown@example.com",
    password: "password456",
  },
  {
    username: "lauren_johnson",
    email: "lauren_johnson@example.com",
    password: "password789",
  },
];

 const seedUsers = () => User.bulkCreate(userSeedData);
 
 module.exports = seedUsers;