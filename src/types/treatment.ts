import { Timestamp } from "firebase/firestore";

export interface Treatment {
  title: string;
  text: string;
  createdAt: Timestamp;
  id: string;
}