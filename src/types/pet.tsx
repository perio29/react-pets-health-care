import { Timestamp } from "@firebase/firestore";

export interface Pet {
  birthday: Timestamp;
  name: string;
  id: string;
}

