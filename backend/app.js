// const { Like } = require("typeorm");
// const express = require("express");
// const cors = require("cors");
// const User = require("./entities/User");
// const Product = require("./entities/Product");
// const path = require("path");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// const AppDataSource = require("./data-source");

// const middlewareAuth = require("./middlewares/auth");

// const app = express();
// app.use(express.json());

// const session = require("express-session");

// // Session Middleware
// app.use(
//   session({
//     secret: "your_secret_key", // Güçlü bir key kullan
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // HTTPS kullanıyorsan true yap
//   })
// );

// app.use(cors({ origin: "*", credentials: true }));

// app.use("/uploads", express.static("uploads"));

// // Kullanıcı kaydı için /register endpoint'i
// app.post("/register", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   if (!firstName || !lastName || !email || !password) {
//     return res.status(400).json({ message: "Tüm alanlar doldurulmalıdır." });
//   }

//   try {
//     const userRepo = AppDataSource.getRepository(User);
//     const existingUser = await userRepo.findOne({ where: { email } });

//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Bu e-posta adresi zaten kullanılıyor." });
//     }

//     const newUser = userRepo.create({ firstName, lastName, email, password });
//     await userRepo.save(newUser);

//     res
//       .status(201)
//       .json({ message: "Kullanıcı başarıyla oluşturuldu.", user: newUser });
//   } catch (error) {
//     console.error("Kullanıcı kaydedilirken hata:", error);
//     res
//       .status(500)
//       .json({ message: "Kullanıcı kaydedilemedi. Lütfen tekrar deneyin." });
//   }
// });
// //Giriş yapma
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "E-posta ve şifre gereklidir." });
//   }

//   try {
//     const userRepo = AppDataSource.getRepository(User);
//     const user = await userRepo.findOne({ where: { email } });

//     if (!user) {
//       return res.status(400).json({ message: "Geçersiz e-posta veya şifre." });
//     }

//     // JWT token oluştur
//     const token = jwt.sign({ userId: user.id }, "your-secret-key", {
//       expiresIn: "1h",
//     });

//     res.json({
//       message: "Giriş başarılı.",
//       token,
//       user: {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Giriş yapılırken hata:", error);
//     res.status(500).json({ message: "Giriş yapılırken bir hata oluştu." });
//   }
// });
// //logout
// app.post("/logout", (req, res) => {
//   res.status(200).json({ message: "Çıkış başarılı." });
// });
// //Kullanıcı profili
// app.get("/user/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const userRepo = AppDataSource.getRepository(User);
//     const user = await userRepo.findOne({ where: { id: userId } });

//     if (!user) {
//       return res.status(404).json({ message: "Kullanıcı bulunamadı." });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Kullanıcı bilgileri getirilirken hata:", error);
//     res.status(500).json({ message: "Sunucu hatası" });
//   }
// });
// //ürün ekle
// app.post("/add-product", upload.single("image"), async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       price,
//       category,
//       subCategory,
//       location,
//       brand,
//       model,
//       year,
//       color,
//       mileage,
//       fuel,
//       userId,
//     } = req.body;
//     const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;

//     const productRepo = AppDataSource.getRepository(Product);

//     const newProduct = productRepo.create({
//       title,
//       description,
//       price,
//       category,
//       subCategory,
//       location,
//       brand,
//       model,
//       year,
//       color,
//       mileage,
//       fuel,
//       imageUrl,
//       userId,
//     });

//     await productRepo.save(newProduct);

//     res
//       .status(201)
//       .json({ message: "Ürün başarıyla oluşturuldu.", product: newProduct });
//   } catch (error) {
//     console.error("Ürün kaydedilirken hata:", error);
//     res
//       .status(500)
//       .json({ message: "Ürün kaydedilemedi. Lütfen tekrar deneyin." });
//   }
// });

// //ürünleri getirme
// app.get("/products/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const productRepo = AppDataSource.getRepository(Product);

//     const products = await productRepo.find({ where: { userId } });

//     if (!products.length) {
//       return res
//         .status(404)
//         .json({ message: "Bu kullanıcıya ait ürün bulunamadı." });
//     }

//     res.json(products);
//   } catch (error) {
//     console.error("Ürünler getirilirken hata:", error);
//     res.status(500).json({ message: "Sunucu hatası 1" });
//   }
// });
// // Tüm ürünleri getirme API'si
// app.get("/products", async (req, res) => {
//   try {
//     const productRepo = AppDataSource.getRepository(Product);
//     const products = await productRepo.find();
//     res.json(products);
//   } catch (error) {
//     console.error("Ürünler alınırken hata oluştu:", error);
//     res.status(500).json({ message: "Ürünler alınırken hata oluştu" });
//   }
// });
// //ürün detay sayfası
// app.get("/product-detail/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const productRepo = AppDataSource.getRepository(Product);

//     const product = await productRepo.findOne({ where: { id } });

//     if (!product) {
//       return res.status(404).json({ message: "Bu id'ye ait ürün bulunamadı." });
//     }

//     res.json(product);
//   } catch (error) {
//     console.error("Ürün getirilirken hata:", error);
//     res.status(500).json({ message: "Sunucu hatası" });
//   }
// });
// // Ürünlerde başlık ile arama yapma
// app.get("/search", async (req, res) => {
//   const { query } = req.query; // Arama sorgusu, query parametrelerinden alınacak

//   if (!query) {
//     return res.status(400).json({ message: "Arama terimi gereklidir." });
//   }

//   try {
//     const productRepo = AppDataSource.getRepository(Product);

//     const products = await productRepo.find({
//       where: {
//         title: query,
//       },
//     });

//     if (!products.length) {
//       return res.status(404).json({ message: "Eşleşen ürün bulunamadı." });
//     }

//     res.json(products); // Eşleşen ürünleri döndürüyoruz
//   } catch (error) {
//     console.error("Arama yapılırken hata oluştu:", error);
//     res.status(500).json({ message: "Arama yapılırken hata oluştu" });
//   }
// });
// //Category bulma
// app.get("/products/main-category/:category", async (req, res) => {
//   const { category } = req.params;

//   try {
//     const productRepo = AppDataSource.getRepository(Product);

//     const products = await productRepo.find({
//       where: {
//         category: category,
//       },
//     });

//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //SubCategory bulma
// app.get("/products/category/:subCategory", async (req, res) => {
//   const { subCategory } = req.params;

//   try {
//     const productRepo = AppDataSource.getRepository(Product);

//     const products = await productRepo.find({
//       where: {
//         subCategory: subCategory,
//       },
//     });

//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Sepetten ürün getirme
// app.get("/get-cart", (req, res) => {
//   console.log(req.session);
//   const cart = req.session.cart || [];
//   console.log(cart);
//   res.json(cart);
// });

// //Konuma göre filtreleme
// app.get("/location", async (req, res) => {
//   try {
//     const location = req.query.locations;

//     if (!location) {
//       return res.status(400).json({ message: "En az bir konum seçmelisiniz." });
//     }

//     const productRepo = AppDataSource.getRepository(Product);

//     const filteredProducts = await productRepo.find({
//       where: {
//         location: location,
//       },
//     });

//     return res.json(filteredProducts);
//   } catch (error) {
//     console.error("Filtreleme hatası:", error);
//     return res.status(500).json({ message: "Sunucu hatası" });
//   }
// });

// // Veritabanı bağlantısını başlat ve sunucuyu çalıştır
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Veritabanı bağlantısı başarılı!");
//     app.listen(4000, () => {
//       console.log("Sunucu 4000 portunda çalışıyor!");
//     });
//   })
//   .catch((error) => {
//     console.error("Veritabanı bağlantısı başarısız:", error);
//   });

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const multer = require("multer");
const middlewareAuth = require("./middlewares/auth");
const AppDataSource = require("./data-source");
const UserRepository = require("./repositories/user.repository");
const ProductRepository = require("./repositories/product.repository");
const AuthService = require("./services/auth.service");
const ProductService = require("./services/product.service");
const AuthController = require("./controllers/auth.controller");
const ProductController = require("./controllers/product.controller");
const UserController = require("./controllers/user.controller");
const UserService = require("./services/user.service");

const app = express();

// Middleware kurulumları
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/" });

const userRepository = new UserRepository(AppDataSource);
const productRepository = new ProductRepository(AppDataSource);
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);
const productService = new ProductService(productRepository);
const userController = new UserController(userService);
const authController = new AuthController(authService);
const productController = new ProductController(productService);

app.post("/register", (req, res) => authController.register(req, res));
app.post("/login", (req, res) => authController.login(req, res));
app.post("/logout", (req, res) => authController.logout(req, res));
app.get("/user/:id", middlewareAuth, (req, res) =>
  userController.getUserProfile(req, res)
);

app.post("/add-product", middlewareAuth, upload.single("image"), (req, res) =>
  productController.createProduct(req, res)
);
app.get("/products/:userId", middlewareAuth, (req, res) =>
  productController.getProductsByUser(req, res)
);
app.get("/products", middlewareAuth, (req, res) =>
  productController.getAllProducts(req, res)
);
app.get("/product-detail/:id", middlewareAuth, (req, res) =>
  productController.getProductDetail(req, res)
);
app.get("/search", middlewareAuth, (req, res) =>
  productController.searchProducts(req, res)
);
app.get("/products/main-category/:category", middlewareAuth, (req, res) =>
  productController.getProductsByCategory(req, res)
);
app.get("/products/category/:subCategory", middlewareAuth, (req, res) =>
  productController.getProductsBySubCategory(req, res)
);
app.get("/location", middlewareAuth, (req, res) =>
  productController.getProductsByLocation(req, res)
);

app.get("/get-cart", middlewareAuth, (req, res) =>
  cartController.getCart(req, res)
);

// Veritabanı bağlantısı ve sunucuyu başlat
AppDataSource.initialize()
  .then(() => {
    console.log("Veritabanı bağlantısı başarılı!");
    app.listen(4000, () => {
      console.log("Sunucu 4000 portunda çalışıyor!");
    });
  })
  .catch((error) => {
    console.error("Veritabanı bağlantısı başarısız:", error);
  });

module.exports = app;
