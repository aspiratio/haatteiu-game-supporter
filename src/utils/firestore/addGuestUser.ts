import { arrayUnion, collection, doc, writeBatch } from "@firebase/firestore";
import { db } from "../../service/firebase";

export const addGuestUser = async (roomId: string, userName: string) => {
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  const usersRef = doc(collection(db, `hgs/v1/rooms/${roomId}/users`));
  const batch = writeBatch(db);
  batch.set(usersRef, {
    displayName: userName,
    isHost: false,
    actOrder: null,
    answers: [],
    score: {},
  });
  batch.update(roomRef, { usersName: arrayUnion(userName) });
  await batch.commit();
  return usersRef.id;
};
