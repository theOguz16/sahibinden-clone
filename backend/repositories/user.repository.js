const BaseRepository = require("./base.repository");
const User = require("../entities/User");

class UserRepository extends BaseRepository {
  constructor(dataSource) {
    super(dataSource, User);
  }

  async findByEmail(email) {
    return await this.findOne({ where: { email } });
  }
  async findById(id) {
    return await this.findOne({ where: { id } });
  }
}
module.exports = UserRepository;
