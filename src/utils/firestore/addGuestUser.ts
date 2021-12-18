import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../service/firebase";

export const addGuestUser = async (roomId: string, userName: string) => {
  // TODO:トランザクション
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  await updateDoc(roomRef, { usersName: arrayUnion(userName) });
  const usersRef = doc(collection(db, `hgs/v1/rooms/${roomId}/users`));
  await setDoc(usersRef, {
    displayName: userName,
    isHost: false,
    actOrder: null,
    answers: [],
    score: null,
  });
  return usersRef.id;
};
