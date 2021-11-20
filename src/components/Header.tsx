import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

interface prop {
  currentUserId: string;
}

export const Header = (props: prop) => {
  const { currentUserId } = props;
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
      const docs: any[] = [];
      docs.push({ id: doc.id, ...doc.data() });
      setUsers(docs[0].displayName);
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
              {users}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
