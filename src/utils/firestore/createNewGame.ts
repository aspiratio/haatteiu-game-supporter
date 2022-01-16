import { collection, doc, getDocs, runTransaction } from "@firebase/firestore";
import { message } from "antd";
import { db } from "../../service/firebase";
import { createAlphabetArray, createNumberArray } from "../createArray";
import { shuffleArray } from "../shuffleArray";

export const createNewGame = async (roomId: string, uploadImg: string) => {
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  const usersRef = collection(db, `hgs/v1/rooms/${roomId}/users`);
  const usersDoc = await getDocs(usersRef);
  const alphabetArray: Array<string> = shuffleArray(
    createAlphabetArray(usersDoc.size)
  );
  const numberArray: Array<string> = shuffleArray(
    createNumberArray(0, usersDoc.size)
  );

  try {
    await runTransaction(db, async (transaction) => {
      const roomDoc = await transaction.get(roomRef);
      if (!roomDoc.exists()) {
        throw new Error(
          "ルームが見つかりません。もう一度最初からお試しください"
        );
      }

      // TODO:Increment()に書き換え
      const newGameCount: number = roomDoc.data().gameCount + 1;
      transaction.update(roomRef, {
        gameCount: newGameCount,
        isDuringGame: true,
        themeImg: uploadImg,
        correctAnswer: alphabetArray,
      });

      usersDoc.forEach((userDoc) => {
        const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userDoc.id}`);
        const number = numberArray.shift();
        transaction.update(userRef, {
          actOrder: number,
          answers: [],
        });
      });
    });
  } catch (e: any) {
    message.error(e);
    throw new Error();
  }
};
