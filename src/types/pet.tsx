import { Timestamp } from "@firebase/firestore";

export interface Pet {
  birthday: Timestamp;
  name: string;
  id: string;
}

export interface Weight {
  id: string;
  volume: number;
  weightDate: string;
}
