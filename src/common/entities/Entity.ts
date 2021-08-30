export abstract class Entity {
    _id?: number;
  
    protected constructor(
      entity?: Entity,
      public readonly PREDICATE_NAME?: string
    ) {
      this._id = entity?._id ? Number(entity._id) : undefined;
    }
  }