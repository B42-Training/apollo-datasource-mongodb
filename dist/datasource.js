"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoDataSource = void 0;
var _graphql = require("graphql");
var _utils = require("@apollo/utils.keyvaluecache");
var _cache = require("./cache");
var _helpers = require("./helpers");
class MongoDataSource {
  constructor({
    modelOrCollection,
    cache
  }) {
    if (!(0, _helpers.isCollectionOrModel)(modelOrCollection)) {
      throw new _graphql.GraphQLError('MongoDataSource constructor must be given a collection or Mongoose model');
    }
    if ((0, _helpers.isModel)(modelOrCollection)) {
      this.model = modelOrCollection;
      this.collection = this.model.collection;
    } else {
      this.collection = modelOrCollection;
    }
    const methods = (0, _cache.createCachingMethods)({
      collection: this.collection,
      model: this.model,
      cache: cache || new _utils.InMemoryLRUCache()
    });
    Object.assign(this, methods);
  }
}
exports.MongoDataSource = MongoDataSource;