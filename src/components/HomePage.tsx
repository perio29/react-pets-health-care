import { Button } from "@mui/material";
import { Header } from "./Header";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { query, collection, onSnapshot, where } from "@firebase/firestore";
import { db } from "../firebase";
import { PetCard } from "./PetCard";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { Pet } from "../types/pet";

export const HomePage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const navigate = useNavigate();
  const { currentUserId, isSignedIn } = useCurrentUser();

  const handleAddPet = () => {
    navigate("/add-pet");
  };

  // petsコレクションの取得
  useEffect(() => {
    const q = query(
      collection(db, "pets"),
      where("ownerId", "==", currentUserId)
    );
    if (currentUserId) {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs: Pet[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            name: doc.data().name,
            birthday: doc.data().birthday,
          });
        });
        setPets(docs);
      });
      return unsubscribe;
    }
  }, [currentUserId]);

  return (
    <>
      {currentUserId && (
        <>
          <Header currentUserId={currentUserId} />
          <Button
            style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}
            variant="contained"
            onClick={handleAddPet}
          >
            ペット追加
          </Button>
          <Box style={{ margin: 20 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              // columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {pets.map((pet) => (
                <Grid item xs={12} sm={6} md={4} key={pet.id}>
                  <PetCard pet={pet} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
      {!isSignedIn && <Navigate to="/signup" />}
    </>
  );
};
