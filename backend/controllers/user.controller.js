class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getUserProfile(req, res) {
    console.log(req);
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  }
}
module.exports = UserController;
