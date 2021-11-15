import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";

export const HomePage = () => {
  const [users, setUsers] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState(true);

  interface posts {
    id: string;
    displayName: string;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
        setIsSignedIn(true);
      } else {
        setCurrentUserId("");
        setIsSignedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: posts[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, displayName: doc.data().displayName });
      });
      const doc = docs.filter((doc) => doc.id === currentUserId);
      const user = doc[0].displayName;
      setUsers(user);
    });
    return unsubscribe;
  }, [currentUserId]);

  return (
    <>
      {currentUserId && (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Avatar src="/broken-image.jpg" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {users}
                </Typography>

                <Button variant="contained">ペット追加</Button>
              </Toolbar>
            </AppBar>
          </Box>
        </>
      )}
      {!isSignedIn && <Navigate to="/signup" />}
    </>
  );
};
