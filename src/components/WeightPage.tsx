import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { Weight } from "../types/weight";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import styled from "@emotion/styled";

export const WeightPage = () => {
  const [petName, setPetName] = useState("");
  const [weight, setWeight] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);
  const [weightDate, setWeightDate] = useState<Date | null>(null);
  const params = useParams();
  const [weights, setWeights] = useState<Weight[]>([]);

  const docId = params.petId;

  const result = weights.map((weight) => {
    return {
      time: `${dayjs(weight.weightDate.toDate().toString()).format(
        "YYYY/MM/DD"
      )}`,
      volume: weight.volume,
    };
  });

  const handleChangeWeight = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWeight(e.target.value);
  };

  // 体重データの追加
  const handleClickAddWeights = async () => {
    try {
      await addDoc(collection(db, `pets/${docId}/weights`), {
        volume: weight,
        createdAt: weightDate,
      });
    } catch (error) {
      alert("エラーが発生しました");
    }
    setWeight("");
  };

  const handleClickEdit = () => {
    setIsModalOn(!isModalOn);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `pets/${docId}`), (doc) => {
      const docRef = doc.data();
      if (docRef) {
        setPetName(docRef.name);
      }
    });

    return unsubscribe;
  }, [docId]);

  // weightsコレクションの取得
  useEffect(() => {
    const q = query(
      collection(db, `pets/${docId}/weights`),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const weightData: Weight[] = [];
      querySnapshot.forEach((doc) => {
        weightData.push({
          id: doc.id,
          volume: doc.data().volume,
          weightDate: doc.data().createdAt,
        });
      });
      setWeights(weightData);
    });
    return unsubscribe;
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
                type="number"
                placeholder="20.0"
                onChange={handleChangeWeight}
              />
              <InputSpan>kg</InputSpan>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={weightDate}
                  onChange={(newWeightDate) => {
                    setWeightDate(newWeightDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button
                style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}
                variant="contained"
                onClick={handleClickAddWeights}
                disabled={!weightDate || !weight}
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
          <LineDiv>
            <LineChart width={1344} height={250} data={result}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="volume" stroke="#82ca9d" />
            </LineChart>
          </LineDiv>
        </MainDiv>
      </ContainerDiv>

      {isModalOn && (
        <Container
          onClick={() => {
            setIsModalOn(!isModalOn);
          }}
        >
          <ModalDiv>
            <ModalInputDiv>
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
            </ModalInputDiv>
          </ModalDiv>
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
  width: 850px;
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

const InputSpan = styled("span")`
  font-size: 15px;
  margin-right: 20px;
  margin-left: 5px;
`;

const LineDiv = styled("div")`
  margin: 0 auto;
`;

const Container = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalDiv = styled("div")`
  width: 500px;
  height: 200px;
  margin: 0 auto;
  background-color: #fff;
`;

const ModalInputDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
