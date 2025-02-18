class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async createProduct(req, res) {
    try {
      const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;
      const product = await this.productService.createProduct(
        req.body,
        imageUrl
      );
      res.status(201).json({ message: "Ürün başarıyla oluşturuldu.", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductsByUser(req, res) {
    try {
      const products = await this.productService.getProductsByUser(
        req.params.userId
      );
      if (!products.length) {
        return res
          .status(404)
          .json({ message: "Bu kullanıcıya ait ürün bulunamadı." });
      }
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Ürünler alınırken hata oluştu" });
    }
  }

  async getProductDetail(req, res) {
    try {
      const product = await this.productService.getProductById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Bu id'ye ait ürün bulunamadı." });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  }

  async searchProducts(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Arama terimi gereklidir." });
      }
      const products = await this.productService.searchProducts(query);
      if (!products.length) {
        return res.status(404).json({ message: "Eşleşen ürün bulunamadı." });
      }
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Arama yapılırken hata oluştu" });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const products = await this.productService.getProductsByCategory(
        req.params.category
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProductsBySubCategory(req, res) {
    try {
      const products = await this.productService.getProductsBySubCategory(
        req.params.subCategory
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProductsByLocation(req, res) {
    try {
      const location = req.query.locations;
      if (!location) {
        return res
          .status(400)
          .json({ message: "En az bir konum seçmelisiniz." });
      }
      const products = await this.productService.getProductsByLocation(
        location
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  }
}
module.exports = ProductController;
