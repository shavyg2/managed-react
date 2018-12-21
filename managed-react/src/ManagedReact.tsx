import { State } from "./State";

export class ManagedReact {
    static create<Base extends {
        [key: string]: any;
    }>(base: Base) {
        return new State(base,null);
    }
}