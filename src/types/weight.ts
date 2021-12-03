import { Timestamp } from "@firebase/firestore";

export interface Weight {
  id: string;
  volume: number;
  weightDate: Timestamp;
}
