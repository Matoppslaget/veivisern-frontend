import { KassalappProduct } from "./Kassalapp";

interface Message {
  type: string;
  message: string;
  product?: KassalappProduct;
  evaluated?: boolean;
}

export type { Message };