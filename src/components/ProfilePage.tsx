import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";

export const ProfilePage = () => {
  const params = useParams();
  const [petName, setPetName] = useState("");
  const [petBirthday, setPetBirthday] = useState("");
  const [petSex, setPetSex] = useState("");
  const [petSpecies, setPetSpecies] = useState("");
  const navigate = useNavigate();

  const docId = params.petId;

  const handleClickWeight = () => {
    navigate(`/weights/${docId}`);
  };

  const handleClickTreatment = () => {
    navigate(`/treatments/${docId}`);
  };

  useEffect(() => {
    const docRef = db
      .collection("pets")
      .doc(docId)
      .onSnapshot((doc) => {
        const docRef = doc.data();
        if (docRef) {
          setPetName(docRef.name);
          setPetSex(docRef.sex);
          setPetSpecies(docRef.species);
          setPetBirthday(docRef.birthday.toDate().toString());
        }
      });

    return docRef;
  }, [docId]);

  return (
    <>
      <Container>
        <MainDiv>
          <Title>{petName}</Title>
          <SubDiv>
            <p>生年月日：{`${dayjs(petBirthday).format("YYYY/MM/DD")}`}</p>
            <p>性別：{petSex}</p>
            <p>種類：{petSpecies}</p>
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
