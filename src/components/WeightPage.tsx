import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

export const WeightPage = () => {
  const [petName, setPetName] = useState("");
  const [weight, setWeight] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);
  const [weightDate, setWeightDate] = useState<Date | null>(null);
  const params = useParams();

  const docId = params.petId;

  const handleAddWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleClickEdit = () => {
    setIsModalOn(!isModalOn);
  };

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
      <ContainerDiv>
        <MainDiv>
          <Title>{petName}</Title>
          <SubDiv>
            <p>体重を入力</p>
            <InputDiv>
              <input
                type="text"
                placeholder="20.0kg"
                onChange={handleAddWeight}
              />
              <Button
                style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}
                variant="contained"
              >
                保存
              </Button>
              <Button
                style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}
                variant="contained"
                onClick={handleClickEdit}
              >
                編集
              </Button>
            </InputDiv>
          </SubDiv>
        </MainDiv>
      </ContainerDiv>

      {isModalOn && (
        <Container
          style={{
            padding: 0,
            width: "100%",
            position: "fixed",
            top: 0,
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Basic example"
                value={weightDate}
                onChange={(newBirthday) => {
                  setWeightDate(newBirthday);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div>
              <input type="text" placeholder="21.3kg" />
              <Button
                style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}
                variant="contained"
              >
                保存
              </Button>
              <Button
                style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}
                variant="contained"
              >
                削除
              </Button>
            </div>
          </Box>
        </Container>
      )}
    </>
  );
};

const ContainerDiv = styled("div")`
  min-height: 100vh;
  width: 100%;
`;

const MainDiv = styled("div")`
  width: 80%;
  margin: 0 auto;
`;

const SubDiv = styled("div")`
  width: 800px;
  font-size: 40px;
  font-weight: 800;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Title = styled("h1")`
  color: #000;
  font-size: 50px;
  font-weight: bold;
`;

const InputDiv = styled("div")`
  margin-left: 30px;
`;
