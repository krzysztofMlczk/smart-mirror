class Collection {
  constructor(dataStore) {
    this.ds = dataStore;
  }

  // CRUD operations
  // CREATE
  async create(item) {
    const newItem = await this.ds.insert(item);
    return newItem;
  }

  // READ
  async getAll() {
    const items = await this.ds.find({});
    return items;
  }

  // UPDATE
  async update(identifier, field, value) {
    const updated = await this.ds.update(
      { _id: identifier },
      { $set: { field: value } }
    );
    return updated;
  }

  // DELETE
  async delete(identifier) {
    const deleted = await this.ds.remove({ _id: identifier });
    return deleted;
  }
}

module.exports = Collection;
