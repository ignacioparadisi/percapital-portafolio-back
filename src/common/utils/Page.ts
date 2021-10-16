import { Entity } from "@Common/entities/Entity";

export class Page<T extends Entity> {
    data: T[] = [];
    total: number = 0;

    constructor(data: T[], total?: number) {
        this.data = data;
        this.total = total ? total : 0;
    }

    static decode<T extends Pageable & Entity >(items: T[]): Page<T> {
        let page = new Page<T>(items, 0);
        if (items.length > 0) {
            if (items[0].total) {
                page.total = items[0].total;
            }
        }
        return page;
    }
}

export interface Pageable {
    total?: number;
}