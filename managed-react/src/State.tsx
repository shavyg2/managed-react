import { Extract } from './index';
import { Distributor } from "./Distributor";
import { Logic } from "./Logic";


export class State<Base extends {[key: string]: any}, Services extends {[key: string]: Distributor<any, any>}> {
    //protected services!: Services;
    constructor(protected base: Base,protected services:Services) {
    }
    use<T extends {[key: string]: Distributor<any, any>}>(services: T) {
        this.services = services as any;
        let state = new State<Base, T>(this.base,services);
        state.services = services;
        return state;
    }
    logic<T extends (base: Base, dispatch: (update: (base: Base) => void) => void, services: {[P in keyof Services]: Extract<Services[P]>}) => any>(api: T) {

        return new Logic(this.base, this.services, api);
    }
}