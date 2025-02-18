const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "text",
      nullable: false,
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    category: {
      type: "varchar",
      nullable: false,
    },
    subCategory: {
      type: "varchar",
      nullable: false,
    },
    location: {
      type: "varchar",
      nullable: false,
    },
    brand: {
      type: "varchar",
      nullable: true,
    },
    model: {
      type: "varchar",
      nullable: true,
    },
    year: {
      type: "int",
      nullable: true,
    },
    color: {
      type: "varchar",
      nullable: true,
    },
    mileage: {
      type: "int",
      nullable: true,
    },
    fuel: {
      type: "varchar",
      nullable: true,
    },
    imageUrl: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    userId: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "userId" },
      onDelete: "CASCADE",
    },
  },
});
