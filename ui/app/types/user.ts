import { Pantry } from "./pantry";

export interface User {
  id: string;
  name: string;
  pantry: Pantry;
}
