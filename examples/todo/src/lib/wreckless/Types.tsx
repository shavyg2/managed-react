export type HTML = HTMLDivElement;
export type NestedArray<T> = T[] | T[][];
export type UnlimitedArray<T> = NestedArray<T> | NestedArray<T>[];