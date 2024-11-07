const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

class Db {
  static client;
  static async connect() {
    this.client = await MongoClient.connect(`${process.env.MONGO_DB}`);
    console.log("db connection is ready");
    return this.client;
  }

  static async query(func) {
    return Promise.resolve(this.client)
      .then((db) => db.db(process.env.MONGO_DB_NAME))
      .then(func)
      .catch((err) => {
        throw new MongoError(err);
      });
  }
}

class MongoError extends Error {
  type;
  error;
  code;
  index;
  constructor(error) {
    super(error);
    this.type = "mongo";
    this.code = error.code;
    this.index = error.index;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

module.exports = {
  Db,
};
