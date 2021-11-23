import { useState, useEffect } from "react";
import { auth } from "../firebase";

export const useCurrentUser = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUserId(user.uid);
      setIsSignedIn(true);
    } else {
      setCurrentUserId("");
      setIsSignedIn(false);
    }
  });

  useEffect(() => {
    unsubscribe();
  }, [unsubscribe]);

  return { currentUserId, isSignedIn };
};
