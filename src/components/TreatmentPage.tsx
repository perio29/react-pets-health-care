import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const TreatmentPage = () => {
  const [petName, setPetName] = useState("");
  const params = useParams();

  const docId = params.petId;

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `pets/${docId}`), (doc) => {
      const docRef = doc.data();
      if (docRef) {
        setPetName(docRef.name);
      }
    });

    return unsubscribe;
  }, [docId]);

  return (
    <>
      <h1>{petName}</h1>
    </>
  );
};
