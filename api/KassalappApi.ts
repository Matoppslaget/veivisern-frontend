import axios from 'axios';
import { Product } from '@/types/ProductTypes';
import KassalappResponse from '@/api/response/ResponseTypes';

const apiKey = process.env.NEXT_PUBLIC_KASSALAPP_API_KEY;
const KassalappEndpoint = 'https://kassal.app/api/v1/products';

export const getKassalappProducts = async (
  product: string,
): Promise<Product[]> => {
  try {
    const response: KassalappResponse = await axios.get(KassalappEndpoint, {
      params: { search: product, size: 20 },
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const filteredProducts = response.data.data.filter(
      (item) => item.ingredients,
    );

    return filteredProducts;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
