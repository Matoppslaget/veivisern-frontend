import {
  NovaIngredient,
  ProcessedClass,
  Product,
} from '../../types/ProductTypes';

export default interface KassalappResponse {
  data: {
    data: Product[];
  };
}

export interface ProcessingInfoResponse {
  data: {
    id: number;
    productName: string;
    kassalappId: number;
    ingredients: NovaIngredient[];
    processedClass: ProcessedClass;
    categories?: {
      id: number;
      depth: number;
      name: string;
    };
  };
}
