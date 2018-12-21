export type ComparePredicate = (a, b) => boolean;
export const defaultPredicate: ComparePredicate = (a, b) => a === b;