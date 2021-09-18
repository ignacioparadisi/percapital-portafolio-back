export abstract class Entity {
    id?: number;

    protected constructor(
        entity?: Entity,
        public readonly PREDICATE_NAME?: string
    ) {
        this.id = entity?.id ? Number(entity.id) : undefined;
    }
}