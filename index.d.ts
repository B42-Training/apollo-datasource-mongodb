declare module 'apollo-datasource-mongodb' {
  import { KeyValueCache } from '@apollo/utils.keyvaluecache'
  import { Collection as MongoCollection, ObjectId } from 'mongodb'
  import {
    Collection as MongooseCollection,
    Document,
    Model as MongooseModel,
    LeanDocument,
  } from 'mongoose'

  export type Collection<T extends { [key: string]: any }, U = MongoCollection<T>> = T extends Document
    ? MongooseCollection
    : U

  export type Model<T, U = MongooseModel<T>> = T extends Document
    ? U
    : undefined

  export type ModelOrCollection<T extends { [key: string]: any }, U = Model<T>> = T extends Document
    ? U
    : Collection<T>

  export interface Fields {
    [fieldName: string]:
      | string
      | number
      | boolean
      | ObjectId
      | (string | number | boolean | ObjectId)[]
  }

  type MongooseDocumentOrMongoCollection<T> = MongoCollection<T> | Document

  export interface Options {
    ttl: number
  }

  export interface MongoDataSourceConfig<TData extends { [key: string]: any }> {
    modelOrCollection: ModelOrCollection<TData>
    cache?: KeyValueCache<TData>
  }

  export class MongoDataSource<TData extends { [key: string]: any }> {
    protected collection: Collection<TData>
    protected model: Model<TData>

    constructor(options: MongoDataSourceConfig<TData>)

    protected findOneById(
      id: ObjectId | string,
      options?: Options
    ): Promise<LeanDocument<TData> | null>

    protected findManyByIds(
      ids: (ObjectId | string)[],
      options?: Options
    ): Promise<(LeanDocument<TData> | null)[]>

    protected findByFields(
      fields: Fields,
      options?: Options
    ): Promise<(LeanDocument<TData> | null)[]>

    protected deleteFromCacheById(id: ObjectId | string): Promise<void>
    protected deleteFromCacheByFields(fields: Fields): Promise<void>
  }
}
