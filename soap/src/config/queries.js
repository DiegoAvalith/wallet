const { Decimal128, ObjectId } = require("mongodb");
const { Db } = require("./db");

class BasicQueries {
  static saveData(name, data) {
    return Db.query((c) => c.collection(name).insertOne(data));
  }

  static getDataByQuery(name, query, project, sort, limit = 0) {
    return Db.query((c) =>
      c
        .collection(name)
        .find(query)
        .sort(sort)
        .project(project)
        .limit(limit)
        .toArray()
    );
  }

  static getDataByRef(name, ref) {
    return Db.query((c) => c.collection(name).aggregate(ref).toArray());
  }

  static updateOneByQuery(name, query, data) {
    return Db.query((c) => c.collection(name).updateOne(query, { $set: data }));
  }

  static updateOneReturnSaved(name, query, data) {
    return Db.query((c) =>
      c.collection(name).findOneAndUpdate(
        query,
        { $set: data },

        { returnDocument: "after", upsert: true, projection: { _id: 0 } },
        (_, doc) => doc
      )
    );
  }

  static deleteOneByQuery(name, query) {
    return Db.query((c) => c.collection(name).deleteOne(query));
  }

  static convertStringToMongoObjectId(id) {
    return new ObjectId(id);
  }

  static numberDecimal(number) {
    return Decimal128.fromString(number);
  }
}

module.exports = {
  BasicQueries,
};
