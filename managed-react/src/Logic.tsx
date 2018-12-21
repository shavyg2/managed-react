import { Extract } from './index';
import { Distributor } from "./Distributor";
import { Builder } from "./Builder";
export class Logic<Base extends {
    [key: string]: any;
}, Services extends {
    [key: string]: Distributor<any, any>;
}, Api extends (base: Base, dispatch: (update: (base: Base) => void) => void, services: {
    [P in keyof Services]: Extract<Services[P]>;
}) => any> {
    constructor(protected base: Base, protected services: Services, protected api: Api) {
    }
    build() {
        let builder = new Builder<Base, Services, Api>(this.base, this.services, this.api);
        return builder.build();
    }
}