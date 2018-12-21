import { isStringAnd } from "./isStringAnd";

export function isNumber(value) {
    return typeof value === "number";
}


export function isPercentage(value) {
    return isStringAnd(value, /[0-9]+%/.test(value));
}


export function isCenter(value){
    return isStringAnd(value,/(center)/i.test(value))
}


//Only applies to horizontal plain
export const OriginHorizontalType = {
    
    isNumber,
    isLeft(value){
        return isStringAnd(value,/left/i.test(value))
    },
    isRight(value){
        return isStringAnd(value,/right/i.test(value))
    },
    isCenter,

}

export const OriginVerticalType = {
    isNumber,
    isTop(value){
        return isStringAnd(value,/top/i.test(value))
    },
    isBottom(value){
        return isStringAnd(value,/bottom/i.test(value))
    },
    isCenter,
}


export const OriginType ={
    ...OriginVerticalType,...OriginHorizontalType
}



export const NumberType = {
    isNumber,
    isPercentage
}


export const SizeType = {
    isAuto(value: string) {
        return typeof value === "string" && /auto/i.test(value);
    },
    isFitContent(value) {
        return isStringAnd(value, /fit-content/i.test(value));
    },
    isMaxContent(value) {
        return isStringAnd(value, /max-content/i.test(value));
    },
    isMinContent(value) {
        return isStringAnd(value, /min-content/i.test(value));
    },
    isPercentage,
    isNumber
};



export const DirectionType = {
    isVertical(value){
        return isStringAnd(value,/vertical/i.test(value))
    },
    isHorizontal(value){
        return isStringAnd(value,/horizontal/i.test(value))
    },
}



export const zIndexType = {
    isTop(value){
        return isStringAnd(value,/top/i.test(value))
    },
    isBottom(value){
        return isStringAnd(value, /bottom/i.test(value))
    },
    isNumber
}


export const TranslateType = {
    isNumber
}