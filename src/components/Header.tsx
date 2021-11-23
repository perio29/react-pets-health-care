import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

interface Props {
  currentUserId: string;
}

export const Header = ({ currentUserId }: Props) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
      const data = doc.data();
      if (data) setUserName(data.displayName);
    });
    return unsub;
  }, [currentUserId]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Avatar src="/broken-image.jpg" onClick={handleClickHome} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {userName}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
