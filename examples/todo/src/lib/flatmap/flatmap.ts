
import flat from "flat";

export function flatmap<T extends (key:string,value:any)=>any>(func:T){
    return object=>{
        let flatten =  (Object.entries(flat(object)).map(([key,value])=>{
            let transform = func(key,value)
            transform = transform === undefined ? value : transform;
            return [key,transform];
        }).reduce((acc,[key,value])=>{
            return {...acc,[key]:value}
        },{}));
        
        return flatten;
    }
}



export function unflatmap<T extends (key:string,value:any)=>any>(func:T){
    return object=>{
    const unflatten =  (Object.entries(flat.unflatten(object)).map(([key,value])=>{
            let transform = func(key,value)
            transform = transform === undefined ? value : transform;
            return [key,transform];
        }).reduce((acc,[key,value])=>{
            return {...acc,[key]:value}
        },{}));

        return unflatten;
    }

    }