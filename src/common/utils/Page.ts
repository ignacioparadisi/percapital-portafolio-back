import { Entity } from "@Common/entities/Entity";

export class Page<T extends Entity> {
    data: T[] = [];
    total: number = 0;

    constructor(data: T[], total?: number) {
        this.data = data;
        this.total = total ? total : 0;
    }
}