import { EvaluatedProduct, KassalappProduct } from "../../types/ProductTypes"

export default interface KassalappResponse {
    data: {
        data: KassalappProduct[]
    }
}

export interface EvaluatedProductResponse {
    data: EvaluatedProduct
}


