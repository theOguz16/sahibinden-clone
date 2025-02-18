class BaseRepository {
  constructor(dataSource, entity) {
    this.dataSource = dataSource;
    this.entity = entity;
    this.repository = dataSource.getRepository(entity);
  }

  async findOne(conditions) {
    return await this.repository.findOne(conditions);
  }

  async find(conditions = {}) {
    return await this.repository.find(conditions);
  }

  async create(data) {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id, data) {
    await this.repository.update(id, data);
    return await this.findOne({ where: { id } });
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}
module.exports = BaseRepository;
