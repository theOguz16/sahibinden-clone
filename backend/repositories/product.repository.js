const BaseRepository = require("./base.repository");
const Product = require("../entities/Product");

class ProductRepository extends BaseRepository {
  constructor(dataSource) {
    super(dataSource, Product);
  }

  async findByCategory(category) {
    return await this.find({ where: { category } });
  }

  async findBySubCategory(subCategory) {
    return await this.find({ where: { subCategory } });
  }

  async findByLocation(location) {
    return await this.find({ where: { location } });
  }

  async findByTitle(title) {
    return await this.find({ where: { title } });
  }

  async findByUserId(userId) {
    return await this.find({ where: { userId } });
  }
}
module.exports = ProductRepository;
