class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(productData, imageUrl) {
    return await this.productRepository.create({
      ...productData,
      imageUrl,
    });
  }

  async getProductsByUser(userId) {
    return await this.productRepository.findByUserId(userId);
  }

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async getProductById(id) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async searchProducts(query) {
    return await this.productRepository.findByTitle(query);
  }

  async getProductsByCategory(category) {
    return await this.productRepository.findByCategory(category);
  }

  async getProductsBySubCategory(subCategory) {
    return await this.productRepository.findBySubCategory(subCategory);
  }

  async getProductsByLocation(location) {
    return await this.productRepository.findByLocation(location);
  }
}
module.exports = ProductService;
