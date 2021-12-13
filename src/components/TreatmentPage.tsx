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
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Treatment } from "../types/treatment";
import { TreatmentModal } from "./TreatmentModal";

export const TreatmentPage = () => {
  const [petName, setPetName] = useState("");
  const params = useParams();
  const [isModalOn, setIsModalOn] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [treatments, setTreatments] = useState<Treatment[]>([]);

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
      setDate(null);
      setTitle("");
      setText("");
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
        const { title, text, createdAt } = doc.data();
        treatmentData.push({
          id: doc.id,
          title: title,
          text: text,
          createdAt: createdAt,
        });
      });
      setTreatments(treatmentData);
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
              {treatments.map((data) => (
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
          {
            <TreatmentModal
              date={date}
              setDate={setDate}
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              handleClickAddEvent={handleClickAddEvent}
              setIsModalOn={setIsModalOn}
            />
          }
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
  //
`;
