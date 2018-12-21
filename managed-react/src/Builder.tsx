import React, { useState, useContext } from "react";
import immer from "immer";
import { Extract } from './index';
import { Distributor } from "./Distributor";
import { ComponentDistributor } from "./ComponentDistributor";


export class Builder<Base extends {
    [key: string]: any;
}, Services extends {
    [key: string]: Distributor<any, React.Context<any>>;
}, Api extends (base: Base, dispatch: (update: (base: Base) => void) => void, services: {
    [P in keyof Services]: Extract<Services[P]>;
}) => any> {
    constructor(protected base: Base, protected services: Services, protected api: Api) {
    }
    build() {
        const self = this;
        const InternalPipe = React.createContext(self.base);
        let Context = React.createContext(this.base as ReturnType<Api>);


        function Provider(props) {
            const [state, originalDispatch] = useState(self.base);
            function dispatch(update) {
                let newState = immer(state, update);
                originalDispatch(newState);
            }
            let services;
            try {
                services = Object.entries(self.services).reduce((acc, [key, value]) => {
                    return { ...acc, [key]: useContext(value.Context) };
                }, {} as any);
            }
            catch (e) {
                if (self.services && Object.keys(self.services).length > 0) {
                    throw e;
                }
                else {
                    services = {};
                }
            }
            let api = self.api(state, dispatch, services);


            Object.entries(api).forEach(([key, value]) => {
                if (typeof value === "function") {
                    try {
                        api[key] = value.bind(api);
                    }
                    catch(e) {
                    }
                }
            })


            return (
                <InternalPipe.Provider value={state}>
                    <Context.Provider {...props} value={api} />
                </InternalPipe.Provider>
            );
        }


        function AsComponent<T extends (props: Base & ReturnType<Api> & Record<string, any>) => any>(CustomView: T) {
            function View(props) {
               
                return (<Provider>
                    <InternalPipe.Consumer>
                        {state=>(
                            <Context.Consumer>
                                {(api) => {
                                    return (<CustomView {...{ ...props, ...api || {} as any, ...state || {} as any }} />);
                                }}
                            </Context.Consumer>
                        )}
                    </InternalPipe.Consumer>
                </Provider>);
            }
            return new ComponentDistributor(Provider, Context, View);
        }
        return new Distributor(Provider, Context, AsComponent);
    }
}