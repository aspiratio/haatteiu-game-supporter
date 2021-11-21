import { arrayRemove, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";

export const removeUser = async (
  roomId: string,
  userName: string,
  userId: string
) => {
  // TODO:トランザクション
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  await updateDoc(roomRef, { usersName: arrayRemove(userName) });
  const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
  await deleteDoc(userRef);
};
