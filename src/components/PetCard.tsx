import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const PetCard = (props: any) => {
  const { pet } = props;

  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent onClick={handleClickProfile}>
          <Typography style={{ marginBottom: 10 }} variant="h5" component="div">
            {pet.name}
          </Typography>
          <Typography variant="h5" component="div">
            {dayjs(pet.birthday).format("YYYY/MM/DD HH:mm")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">削除</Button>
          <Button variant="contained">編集</Button>
        </CardActions>
      </Card>
    </>
  );
};
