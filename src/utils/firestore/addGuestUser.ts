import { collection, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";

export const addGuestUser = async (roomId: string, userName: string) => {
  const usersRef = doc(collection(db, `hgs/v1/rooms/${roomId}/users`));
  await setDoc(usersRef, { displayName: userName, isHost: false });
};
