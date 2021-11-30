import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";

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
      <Container>
        <MainDiv>
          <Title>{pet?.name}</Title>
          <SubDiv>
            <p>生年月日：{`${dayjs(pet?.birthday).format("YYYY/MM/DD")}`}</p>
            <p>性別：{pet?.sex}</p>
            <p>種類：{pet?.species}</p>
          </SubDiv>
          <ButtonDiv>
            <Button
              style={{ fontSize: "30px" }}
              variant="contained"
              onClick={handleClickWeight}
            >
              体重管理
            </Button>
            <Button
              style={{ fontSize: "30px" }}
              variant="contained"
              onClick={handleClickTreatment}
            >
              診療履歴
            </Button>
          </ButtonDiv>
        </MainDiv>
      </Container>
    </>
  );
};

const Container = styled("div")`
  min-height: 100vh;
  width: 100%;
`;

const MainDiv = styled("div")`
  width: 80%;
  margin: 0 auto;
`;

const SubDiv = styled("div")`
  font-size: 40px;
  font-weight: 800;
  margin-left: 20px;
`;

const Title = styled("h1")`
  color: #333;
  font-size: 50px;
  font-weight: bold;
`;

const ButtonDiv = styled("div")`
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;
