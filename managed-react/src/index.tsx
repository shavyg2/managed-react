
import React from "react";
import { Distributor } from './Distributor';


export type Extract<T> = T extends Distributor<any,React.Context<infer K>> ? K:never;



