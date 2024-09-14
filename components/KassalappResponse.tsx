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

export default interface KassalappResponse {
    data: {
        data: KassalappProduct[]
    }
}

export interface EvaluatedProduct extends KassalappProduct {
    novaIngredients?: NovaIngredients,
    processedClass?: ProcessedClass,
    upAnswer?: ProcessedClass
}

export interface EvaluatedProductResponse {
    data: EvaluatedProduct
}

interface NovaIngredients {
    [key: string]: number;
  }

export enum ProcessedClass {
    NOT_SET = "NOT_SET",
    MINIMAL_PROCESSED = "Minimalt Prosessert",
    PROCESSED = "Prosessert",
    ULTRAPROCESSED = "Ultraprosessert",
}
