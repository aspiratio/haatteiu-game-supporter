import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../service/firebase";

export const stopGame = async (roomId: string) => {
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  try {
    await updateDoc(roomRef, { isDuringGame: false });
  } catch {
    throw new Error("Firestoreの更新失敗");
  }
};
