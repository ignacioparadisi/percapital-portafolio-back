export abstract class OldCommand<T> {
    abstract execute(): Promise<T | T[] | void>;
}

export abstract class Command<Params, Result> {
    constructor(protected readonly params: Params) { }

    abstract execute(): Promise<Result | Result[]>;
}