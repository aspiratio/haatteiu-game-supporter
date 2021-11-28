import { collection, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";

export const createNewRoom = async (name: string) => {
  const roomsRef = doc(collection(db, "hgs/v1/rooms"));
  const usersRef = doc(collection(db, `hgs/v1/rooms/${roomsRef.id}/users`));
  await setDoc(roomsRef, {
    createdAt: serverTimestamp(),
    usersName: [name],
    gameCount: 0,
    isDuringGame: false,
    themeImg: "",
  });
  await setDoc(usersRef, { displayName: name, isHost: true });
  return {
    roomId: roomsRef.id,
    userId: usersRef.id,
  };
};
