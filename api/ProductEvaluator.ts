import axios from 'axios';
import { EvaluatedProductResponse } from '@/api/response/ResponseTypes';
import { KassalappProduct, EvaluatedProduct } from '@/types/ProductTypes';


const env = process.env.NEXT_PUBLIC_DEVELOPMENT_ENVIRONMENT;
const ProductEvaluationEndpoint = env === 'prod' ? 'https://veivisern-backend-igvu.onrender.com/products/kassalapp_id/' : 'http://localhost:8000/products/kassalapp_id/';

export const fetchProductEvaluation = async (product: KassalappProduct): Promise<EvaluatedProduct> => {
    try {
        const response: EvaluatedProductResponse = await axios.get(`${ProductEvaluationEndpoint}${product.id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
