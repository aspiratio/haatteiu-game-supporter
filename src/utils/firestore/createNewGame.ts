import { collection, doc, getDocs, runTransaction } from "@firebase/firestore";
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
    createNumberArray(usersDoc.size)
  );

  try {
    await runTransaction(db, async (transaction) => {
      const roomDoc = await transaction.get(roomRef);
      if (!roomDoc.exists()) {
        throw new Error("Document does not exist!");
      }

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
        });
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};
