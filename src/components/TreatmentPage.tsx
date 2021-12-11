import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import dayjs from "dayjs";
import {
  doc,
  onSnapshot,
  addDoc,
  collection,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Treatment } from "../types/treatment";

export const TreatmentPage = () => {
  const [petName, setPetName] = useState<string>("");
  const params = useParams();
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [treatmentData, setTreatmentData] = useState<Treatment[]>([]);

  const docId = params.petId;

  const toggleModalOn = () => {
    setIsModalOn(!isModalOn);
  };

  // vaccinationsサブコレクションの追加
  const handleClickAddEvent = async () => {
    try {
      await addDoc(collection(db, `pets/${docId}/vaccinations`), {
        title: title,
        createdAt: date,
        text: text,
      });
    } catch (error) {
      alert("エラーが発生しました");
    }
    setIsModalOn(false);
  };

  //ペットの名前を取得
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `pets/${docId}`), (doc) => {
      const docRef = doc.data();
      if (docRef) {
        setPetName(docRef.name);
      }
    });

    return unsubscribe;
  }, [docId]);

  //vaccinationsサブコレクションの取得
  useEffect(() => {
    const q = query(
      collection(db, `pets/${docId}/vaccinations`),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const treatmentData: Treatment[] = [];
      querySnapshot.forEach((doc) => {
        treatmentData.push({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
        });
      });
      setTreatmentData(treatmentData);
    });
    return unsubscribe;
  }, [docId]);

  return (
    <>
      <Title>{petName}</Title>
      <ButtonDiv>
        <Button
          style={{ fontSize: "20px" }}
          variant="contained"
          onClick={toggleModalOn}
        >
          診療記録を追加
        </Button>
      </ButtonDiv>

      <RecordDiv>
        <RecordTitle>診療記録</RecordTitle>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "400px" }}>日付</TableCell>
                <TableCell align="left">タイトル</TableCell>
                <TableCell align="left">診療内容</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {treatmentData.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${dayjs(data.createdAt.toDate().toString()).format(
                      "YYYY年MM月DD日"
                    )}`}
                  </TableCell>
                  <TableCell align="left">{data.title}</TableCell>
                  <TableCell align="left">{data.text}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      onClick={async () => {
                        await deleteDoc(
                          doc(db, `pets/${docId}/vaccinations/${data.id}`)
                        );
                      }}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RecordDiv>

      {isModalOn && (
        <>
          <Modal>
            <InputDiv>
              <InputBox>
                <DateDiv>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={date}
                      onChange={(newDate) => {
                        setDate(newDate);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </DateDiv>
                <ModalTitle>タイトル</ModalTitle>
                <InputArea
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
                <ModalTitle>診療内容</ModalTitle>

                <TextArea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <Button
                  style={{ display: "block", margin: "20px auto 0px" }}
                  variant="contained"
                  onClick={handleClickAddEvent}
                  disabled={date === null || title === "" || text === ""}
                >
                  登録
                </Button>

                <Button
                  style={{ display: "block", margin: "20px 0px 0px auto" }}
                  variant="contained"
                  onClick={() => {
                    setIsModalOn(false);
                  }}
                >
                  閉じる
                </Button>
              </InputBox>
            </InputDiv>
          </Modal>
        </>
      )}
    </>
  );
};

const Title = styled("h1")`
  margin-left: 20px;
  font-size: 40px;
  font-weight: bold;
`;

const RecordDiv = styled("div")`
  width: 80%;
  margin: 40px auto 0;
`;

const ButtonDiv = styled("div")`
  margin-left: 50px;
`;

const RecordTitle = styled("h2")`
  font-size: 30px;
  font-weight: bold;
`;

const Modal = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const InputDiv = styled("div")`
  width: 800px;
  background-color: #fff;
  display; flex;
  padding: 50px 0;
`;

const InputBox = styled("div")`
  text-align: center;
  margin: auto auto;
  width: 400px;
`;

const DateDiv = styled("div")``;

const ModalTitle = styled("p")`
  font-size: 20px;
  font-weight: bold;
`;

const InputArea = styled("input")`
  width: 230px;
`;

const TextArea = styled("textarea")`
  width: 230px;
`;
