declare module 'apollo-datasource-mongodb' {
  import { KeyValueCache } from '@apollo/utils.keyvaluecache'
  import { Collection as MongoCollection, ObjectId, Document } from 'mongodb'
  import {
    Collection as MongooseCollection,
    Model as MongooseModel
  } from 'mongoose'

  export type Collection<T, U = MongoCollection> = T extends Document ? U : MongooseCollection

  export type Model<T, U = MongooseModel<T>> = U

  export type ModelOrCollection<T, U = Model<T>> = U | Collection<T>

  export interface Fields {
    [fieldName: string]:
      | string
      | number
      | boolean
      | ObjectId
      | (string | number | boolean | ObjectId)[]
  }

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
    ): Promise<TData | null>

    protected findManyByIds(
      ids: (ObjectId | string)[],
      options?: Options
    ): Promise<(TData | null)[]>

    protected findByFields(
      fields: Fields,
      options?: Options
    ): Promise<(TData | null)[]>

    protected deleteFromCacheById(id: ObjectId | string): Promise<void>
    protected deleteFromCacheByFields(fields: Fields): Promise<void>
  }
}
