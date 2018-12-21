import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
export const db = low(adapter)

db.defaults({
    users:[],
    color_profiles:[]
}).write();