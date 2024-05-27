

enum ProcessedClass {
  NOT_SET = "NOT_SET",
  MINIMAL_PROCESSED = "Minimalt Prosessert",
  PROCESSED = "Prosessert",
  ULTRAPROCESSED = "Ultraprosessert"
}

interface KassalappProduct {
  id: number;
  name: string;
  price: number;
}

interface KassalappCategory {
  id: number;
  depth: number;
  name: string;
}

interface Ingredient {
  name: string;
  nova_group?: number;
}

interface KassalappProduct {
  id: number;
  name: string;
  brand?: string | null;
  vendor?: string | null;
  ean?: string | null;
  url: string;
  image?: string | null;
  category?: KassalappCategory[] | null;
  description?: string | null;
  ingredients: string;
  current_price?: number | null;
  current_unit_price?: number | null;
  weight?: number | null;
  weight_unit?: string | null;
  labels?: any[] | null;
  created_at?: string | null;
  updated_at?: string | null;
  nova_ingredients: Ingredient[];
  processed_class: ProcessedClass | ProcessedClass.NOT_SET;
  up_answer?: string | "";
}

interface KassalappProductCategory {
  products: KassalappProduct[];
  category: KassalappCategory;
}

export { ProcessedClass };
export type { KassalappProduct, KassalappCategory, KassalappProductCategory };
