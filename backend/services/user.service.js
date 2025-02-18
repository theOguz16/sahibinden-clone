class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }
}
module.exports = UserService;
