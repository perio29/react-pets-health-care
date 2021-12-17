import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const ProfilePage = () => {
  const params = useParams();
  const [pet, setPet] = useState<Pet>();
  const navigate = useNavigate();

  const docId = params.petId;

  const handleClickWeight = () => {
    navigate(`/profile/${docId}/weights`);
  };

  const handleClickTreatment = () => {
    navigate(`/profile/${docId}/treatments`);
  };

  interface Pet {
    name: string;
    sex: string;
    species: string;
    birthday: string;
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `pets/${docId}`), (doc) => {
      const docRef = doc.data();
      if (docRef) {
        setPet({
          ...pet,
          name: docRef.name,
          sex: docRef.sex,
          species: docRef.species,
          birthday: docRef.birthday.toDate().toString(),
        });
      }
    });

    return unsubscribe;
  }, [pet, docId]);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#fff", height: "100vh" }}>
          <MainDiv>
            <Typography variant="h2" gutterBottom component="div">
              {pet?.name}
            </Typography>
            <SubDiv>
              <Typography variant="h3" gutterBottom component="div">
                生年月日:{`${dayjs(pet?.birthday).format("YYYY/MM/DD")}`}
              </Typography>
              <Typography variant="h3" gutterBottom component="div">
                性別:{pet?.sex}
              </Typography>
              <Typography variant="h3" gutterBottom component="div">
                種類:{pet?.species}
              </Typography>
            </SubDiv>
            <ButtonDiv>
              <Button
                sx={{ fontSize: "30px" }}
                variant="contained"
                onClick={handleClickWeight}
              >
                体重管理
              </Button>
              <Button
                sx={{ fontSize: "30px", marginLeft: "20px" }}
                variant="contained"
                onClick={handleClickTreatment}
              >
                診療履歴
              </Button>
            </ButtonDiv>
          </MainDiv>
        </Box>
      </Container>
    </>
  );
};

const MainDiv = styled("div")`
  padding-top: 10px;
  width: 80%;
  margin: 0 auto;
`;

const SubDiv = styled("div")`
  font-size: 40px;
  font-weight: 800;
  margin-left: 20px;
`;

const ButtonDiv = styled("div")`
  text-align: center;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-around;
`;
