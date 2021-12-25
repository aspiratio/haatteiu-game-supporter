import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { message } from "antd";
import { db } from "../../service/firebase";

export const sendAnswer = async (
  roomId: string,
  userId: string,
  answer: string
) => {
  try {
    const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
    await updateDoc(userRef, {
      answers: arrayUnion(answer),
    });
    console.log("send answer");
  } catch {
    message.error("通信エラーです。もう一度お試しください");
  }
};
