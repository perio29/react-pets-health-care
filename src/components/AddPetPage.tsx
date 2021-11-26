import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, myTimeStamp } from "../firebase";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export const AddPetPage = () => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [sex, setSex] = useState<"オス" | "メス">("オス");
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

  const handleClickAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "pets"), {
        name: name,
        birthday: birthday,
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

  const handleClickClose = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          marginTop: 8,
          marginLeft: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={birthday}
              onChange={(newBirthday) => {
                setBirthday(newBirthday);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
          <Select
            value={sex}
            sx={{ width: 1000 }}
            onChange={(e) => {
              if (e.target.value === "オス" || e.target.value === "メス")
                setSex(e.target.value);
            }}
          >
            <MenuItem value={"オス"}>オス</MenuItem>
            <MenuItem value={"メス"}>メス</MenuItem>
          </Select>
        </div>
        {/* <div style={{ width: 1000 }}>
          {/* <Button
            style={{ marginTop: 20, marginRight: 20 }}
            variant="outlined"
            onClick={handleClickAdd}
          >
            写真を追加
          </Button> */}
        {/* </div> */}
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
            onClick={handleClickClose}
          >
            戻る
          </Button>
        </div>
      </Box>
    </>
  );
};
