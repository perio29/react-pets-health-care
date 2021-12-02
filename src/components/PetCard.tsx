import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Pet } from "../types/pet";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  pet: Pet;
};

export const PetCard = ({ pet }: Props) => {
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate(`/profile/${pet.id}`);
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent onClick={handleClickProfile}>
          <Typography style={{ marginBottom: 10 }} variant="h5" component="div">
            {pet.name}
          </Typography>
          <Typography variant="h5" component="div">
            {`${dayjs(pet.birthday.toDate().toString()).format("YYYY/MM/DD")}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={async () => {
              await deleteDoc(doc(db, "pets", pet.id));
            }}
          >
            削除
          </Button>
          <Button variant="contained">編集</Button>
        </CardActions>
      </Card>
    </>
  );
};
