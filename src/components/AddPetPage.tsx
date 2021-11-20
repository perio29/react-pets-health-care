import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, myTimeStamp } from "../firebase";
import firebase from "firebase/compat/app";

export const AddPetPage = () => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [sex, setSex] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId("");
      }
    });
    return unsubscribe;
  }, []);

  const timestamp = (datetimeStr: string) => {
    return firebase.firestore.Timestamp.fromDate(new Date(datetimeStr));
  };

  const handleClickAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      addDoc(collection(db, "pets"), {
        name: name,
        birthday: timestamp(birthday),
        species: species,
        sex: sex,
        createdAt: myTimeStamp,
        ownerId: currentUserId,
      });
    } catch (error) {
      alert("エラーが発生しました");
    }
    navigate("/");
  };

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <p>名前</p>
          <TextField
            sx={{ width: 1000 }}
            placeholder="ポチ"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <p>生年月日</p>
          <TextField
            sx={{ width: 1000 }}
            placeholder="1999/01/11 ※半角英数字で入力してください"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
          />
        </div>
        <div>
          <p>種類</p>
          <TextField
            sx={{ width: 1000 }}
            placeholder="雑種"
            value={species}
            onChange={(e) => {
              setSpecies(e.target.value);
            }}
          />
        </div>
        <div>
          <p>性別</p>
          <TextField
            sx={{ width: 1000 }}
            placeholder="オス"
            value={sex}
            onChange={(e) => {
              setSex(e.target.value);
            }}
          />
        </div>
        <div style={{ width: 1000 }}>
          <Button
            style={{ marginTop: 20, marginRight: 20 }}
            variant="outlined"
            onClick={handleClickAdd}
          >
            写真を追加
          </Button>
        </div>
        <div>
          <Button
            style={{ marginTop: 20, marginRight: 20 }}
            variant="contained"
            onClick={handleClickAdd}
          >
            追加
          </Button>
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            onClick={handleClickHome}
          >
            戻る
          </Button>
        </div>
      </Box>
    </>
  );
};
