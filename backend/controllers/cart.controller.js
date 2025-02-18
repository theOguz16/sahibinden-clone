class CartController {
  async getCart(req, res) {
    const cart = req.session.cart || [];
    res.json(cart);
  }
}
module.exports = CartController;
