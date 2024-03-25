
export abstract class GenericRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: any): Promise<T | null>;
  abstract find(model: any): Promise<T | null>;
  abstract create(entity: any): Promise<T>;
  abstract updateAt(id:any, entity: any): Promise<T>;
  abstract delete(id: any): Promise<boolean>;
}