import { collection, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";

export const createNewRoom = async (name: string) => {
  const newRoomRef = doc(collection(db, "hgs/v1/rooms"));
  const usersRef = doc(collection(db, `hgs/v1/rooms/${newRoomRef.id}/users`));
  await setDoc(newRoomRef, { createdAt: serverTimestamp() });
  await setDoc(usersRef, { displayName: name, isHost: true });
  return newRoomRef.id;
};
