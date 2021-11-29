import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";

export const TreatmentPage = () => {
  const [petName, setPetName] = useState("");
  const params = useParams();

  const docId = params.petId;

  useEffect(() => {
    const docRef = db
      .collection("pets")
      .doc(docId)
      .onSnapshot((doc) => {
        const docRef = doc.data();
        if (docRef) {
          setPetName(docRef.name);
        }
      });

    return docRef;
  }, [docId]);

  return (
    <>
      <h1>{petName}</h1>
    </>
  );
};
