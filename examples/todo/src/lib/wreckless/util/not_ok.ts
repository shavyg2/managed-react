


export function not_ok(condition,message) {
            if(condition){
                throw new Error(message);
            }
}