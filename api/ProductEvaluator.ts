import axios from 'axios';
import { EvaluatedProduct, EvaluatedProductResponse, KassalappProduct } from '@/components/KassalappResponse';

const ProductEvaluationEndpoint = 'http://127.0.0.1:8000/evaluate_product';  // Point to the local FastAPI endpoint

export const fetchProductEvaluation = async (product: KassalappProduct): Promise<EvaluatedProduct> => {
    try {
        const response: EvaluatedProductResponse = await axios.post(ProductEvaluationEndpoint, product);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
