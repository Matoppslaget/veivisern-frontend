import { KassalappProduct } from "./Kassalapp";

interface Message {
  type: string;
  message: string;
  product?: KassalappProduct;
}

export type { Message };