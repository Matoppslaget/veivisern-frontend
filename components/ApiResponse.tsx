export interface KassalappProduct {
    id: number,
    name: string,
    brand: string,
    vendor: string,
    ean: string,
    url: string,
    image: string,
    description: string,
    ingredients?: string,
    current_price: number,
    current_unit_price: number,
    weight: number,
    weight_unit: string
}

export default interface ApiResponse {
    data: {
        data: KassalappProduct[]
    }
}