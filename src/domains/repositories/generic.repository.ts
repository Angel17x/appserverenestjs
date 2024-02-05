
export abstract class GenericRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: any): Promise<T | null>;
  abstract find(model: T): Promise<T | null>;
  abstract create(entity: T): Promise<T>;
  abstract updateAt(id:any, entity: T): Promise<T>;
  abstract delete(id: any): Promise<boolean>;
}