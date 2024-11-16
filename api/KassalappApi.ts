import axios from 'axios';
import { KassalappProduct } from '@/types/ProductTypes';
import KassalappResponse from '@/api/response/ResponseTypes';

const apiKey = process.env.NEXT_PUBLIC_KASSALAPP_API_KEY;
const KassalappEndpoint = 'https://kassal.app/api/v1/products';

export const fetchResults = async (
  product: string,
): Promise<KassalappProduct[]> => {
  try {
    const response: KassalappResponse = await axios.get(KassalappEndpoint, {
      params: { search: product },
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
