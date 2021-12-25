import { arrayRemove, doc, writeBatch } from "@firebase/firestore";
import { db } from "../../service/firebase";

export const removeUser = async (
  roomId: string,
  userName: string,
  userId: string
) => {
  const batch = writeBatch(db);
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
  batch.delete(userRef);
  batch.update(roomRef, { usersName: arrayRemove(userName) });
  await batch.commit();
};
