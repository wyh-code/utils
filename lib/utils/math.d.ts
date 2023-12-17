type TComputType = "+" | '-' | '*' | '/';
export declare function compute(type: TComputType, ...args: number[]): {
    result: number;
    next(nextType: TComputType, ...nextArgs: number[]): any;
};
export {};
