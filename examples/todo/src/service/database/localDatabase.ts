import { db } from '../database/db';
import ManagedReact from 'managed-react';




export const LocalDatabase = ManagedReact.create({
    database:db
})
.logic((state)=>state.database)
.build()






