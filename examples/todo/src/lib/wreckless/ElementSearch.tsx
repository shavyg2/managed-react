import { ComparePredicate, defaultPredicate } from "./ComparePredicate";
export class ElementSearch {
    find<T>(elements: T[] | T[][], element: any, predicate?: ComparePredicate) {
        const searching: number[] = [];
        let result = this._findWithPositionLookup(elements, element, predicate, searching);
        if (result) {
            return searching.reverse();
        }
        else {
            return false;
        }
    }
    private _findWithPositionLookup<T>(elements: T[], element: T, predicate: ComparePredicate = defaultPredicate, searching: number[] = []) {
        return elements.find((itemOrCollection, index) => {
            if (!Array.isArray(itemOrCollection) &&
                predicate(itemOrCollection, element)) {
                searching.push(index);
                return true;
            }
            else if (Array.isArray(itemOrCollection)) {
                let result = this._findWithPositionLookup(itemOrCollection, element, predicate, searching);
                if (result) {
                    searching.push(index);
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
}