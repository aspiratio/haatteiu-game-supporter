import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";

export const updateScore = async (
  roomId: string,
  userId: string,
  userScore: any
) => {
  const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
  await updateDoc(userRef, { score: userScore });
};
