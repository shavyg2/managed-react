



export function ObjectSwitch<T extends {[key:string]:(arg:any)=>boolean}>(object:T,value:any):keyof T {
    return Object.keys(object).find(key=>{
        return object[key](value)
    })
}