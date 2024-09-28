import { EvaluatedProduct, KassalappProduct } from "./ProductTypes"

export default interface KassalappResponse {
    data: {
        data: KassalappProduct[]
    }
}

export interface EvaluatedProductResponse {
    data: EvaluatedProduct
}


