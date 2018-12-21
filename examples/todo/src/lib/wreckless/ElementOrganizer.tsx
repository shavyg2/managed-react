import immer from "immer";
import { ComparePredicate, defaultPredicate } from './ComparePredicate';


export class ElementOrganizer {
    moveElementUp<T>(elements: any[], element: any, predicate?: ComparePredicate) {
        if (!predicate) {
            predicate = (a, b) => a === b;
        }
        let index = elements.findIndex((question) => {
            return predicate(question, element);
        });
        if (~index) {
            return immer(elements, elements => {
                elements.splice(index,1);
                elements.splice(index+1, 0, element);
            });
        }
        else {
            return elements;
        }
    }
    moveElementDown<T>(elements: T[], element: T, predicate?: ComparePredicate) {
        if (!predicate) {
            predicate = (a, b) => a === b;
        }
        let index = elements.findIndex((question) => {
            return predicate(question, element);
        });
        if (~index && elements.length > 1) {
            const clone = elements.slice(0);
            switch (index) {
                case 0:
                    break;
                case 1: 
                clone.splice(index,1);
                clone.unshift(element)
                break;
                default:
                clone.splice(index);
                    clone.splice(index - 1, 0, element);
                }
                return clone
        }else{
            return elements;
        }
    }


    addElement<T>(elements:T[],element){
        const clone = elements.slice(0)
        clone.push(element)
        return clone;
    }


    removeElement<T>(elements:T[],element,predicate=defaultPredicate){
        const clone = elements.slice(0)
        let index = clone.findIndex((el)=>{
            return predicate(element,el)
        })

        if(~index){
            clone.splice(index,1)
            return clone;
        }else{
            return elements
        }
    }
}

