import { KassalappProduct } from "./Kassalapp";

interface Message {
  renderKey: number;
  type: string;
  message: string;
  product?: KassalappProduct;
  evaluated?: boolean;
}

export type { Message };