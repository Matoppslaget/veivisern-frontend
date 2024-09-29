export interface KassalappProduct {
    id: number,
    name: string,
    brand?: string,
    vendor?: string,
    ean?: string,
    url?: string,
    image?: string,
    description?: string,
    ingredients?: string,
    currentPrice?: number,
    currentUnitPrice?: number,
    weight?: number,
    weightUnit?: string,
}

export interface EvaluatedProduct extends KassalappProduct {
    novaIngredients?: NovaIngredients,
    processedClass?: ProcessedClass,
    upAnswer?: ProcessedClass
}

export enum NovaClass{
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}

export interface NovaIngredients {
    [key: string]: NovaClass;
}

export enum ProcessedClass {
    NOT_SET = "NOT_SET",
    MINIMAL_PROCESSED = "Minimalt Prosessert",
    PROCESSED = "Prosessert",
    ULTRAPROCESSED = "Ultraprosessert",
}