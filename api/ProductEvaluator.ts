import axios from 'axios';
import { EvaluatedProductResponse } from '@/types/ResponseTypes';
import { KassalappProduct, EvaluatedProduct } from '@/types/ProductTypes';


const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
const ProductEvaluationEndpoint = env === 'prod' ? 'https://brainy-oneida-sanders-consulting-4fc76d82.koyeb.app/evaluate_product' : 'http://localhost:8000/evaluate_product';

export const fetchProductEvaluation = async (product: KassalappProduct): Promise<EvaluatedProduct> => {
    try {
        const response: EvaluatedProductResponse = await axios.post(ProductEvaluationEndpoint, product);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
