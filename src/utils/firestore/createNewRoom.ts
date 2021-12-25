import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from "@firebase/firestore";
import { db } from "../../service/firebase";

export const createNewRoom = async (name: string) => {
  const roomsRef = doc(collection(db, "hgs/v1/rooms"));
  const usersRef = doc(collection(db, `hgs/v1/rooms/${roomsRef.id}/users`));
  const batch = writeBatch(db);
  batch.set(roomsRef, {
    createdAt: serverTimestamp(),
    usersName: [name],
    gameCount: 0,
    isDuringGame: false,
    themeImg: "",
    correctAnswer: [],
  });
  batch.set(usersRef, {
    displayName: name,
    isHost: true,
    actOrder: null,
    answers: [],
    score: {},
  });
  await batch.commit();
  return {
    roomId: roomsRef.id,
    userId: usersRef.id,
  };
};
