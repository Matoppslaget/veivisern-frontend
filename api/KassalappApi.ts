import axios from 'axios';
import ApiResponse, { KassalappProduct } from '@/components/ApiResponse';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

const apiKey = process.env.NEXT_PUBLIC_KASSALAPP_API_KEY;

export const fetchResults = async (product: string): Promise<KassalappProduct[]> => {
    const url = 'https://kassal.app/api/v1/products';
    try {
        const response: ApiResponse = await axios.get(url, {
            params: { search: product },
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

