export interface Product {
  id: number; // kassalappId
  name: string; // productName
  brand?: string;
  vendor?: string;
  ean?: string;
  url?: string;
  image?: string;
  description?: string;
  ingredients?: string;
  currentPrice?: number;
  currentUnitPrice?: number;
  weight?: number;
  weightUnit?: string;
  novaIngredients?: NovaIngredient[];
  processedClass?: ProcessedClass;
}

export enum NovaClass {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
}

export interface NovaIngredient {
  ingredientName: string;
  novaClass: NovaClass;
}

export enum ProcessedClass {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
}
