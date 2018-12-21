import { ManagedReact } from "managed-react";
import { LocalDatabase } from './localDatabase';

export const DatabaseService = ManagedReact.create({
    Todo:"todos"
})
.use({
    db:LocalDatabase
}).logic((state,dispatch,services)=>{

    let api = Object.entries(state)
    .reduce((acc,[key,value])=>{
        return {...acc,[key]:services.db.defaults([]).get(value)}
    },{}) as {[P in keyof typeof state]:any}

    return api;

}).build()