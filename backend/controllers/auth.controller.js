class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const user = await this.authService.register(req.body);
      res
        .status(201)
        .json({ message: "Kullanıcı başarıyla oluşturuldu.", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.json({ message: "Giriş başarılı.", ...result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
module.exports = AuthController;
