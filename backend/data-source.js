const { DataSource } = require("typeorm");
require("reflect-metadata");
const User = require("./entities/User");
const Product = require("./entities/Product");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "theoguz",
  database: "CloneDB",
  synchronize: false,
  logging: false,
  entities: [User, Product],
});

module.exports = AppDataSource;
