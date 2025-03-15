import axios from 'axios';
import { ProcessingInfoResponse } from '@/src/data-access-layer/api/response/ResponseTypes';
import { Product } from '@/types/ProductTypes';

const env = process.env.NEXT_PUBLIC_DEVELOPMENT_ENVIRONMENT;
const ProductEvaluationEndpoint =
  env === 'prod'
    ? 'https://veivisern-backend-igvu.onrender.com/products/kassalapp_id/'
    : 'http://localhost:8000/products/kassalapp_id/';

export const getProcessingInfo = async (product: Product): Promise<Product> => {
  try {
    const response: ProcessingInfoResponse = await axios.get(
      `${ProductEvaluationEndpoint}${product.id}`,
    );
    product.novaIngredients = response.data.ingredients;
    product.processedClass = response.data.processedClass;
    return product;
  } catch (error) {
    console.log('Error fetching for product:', product.name);
    console.error('Error fetching data:', error);
    throw error;
  }
};
