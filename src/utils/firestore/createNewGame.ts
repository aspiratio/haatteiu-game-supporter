import { collection, doc, getDocs, runTransaction } from "@firebase/firestore";
import { db } from "../../service/firebase";
import { createAlphabetArray } from "../createAlphabetArray";
import { shuffleArray } from "../shuffleArray";

export const createNewGame = async (roomId: string) => {
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  const usersRef = collection(db, `hgs/v1/rooms/${roomId}/users`);
  const usersDoc = await getDocs(usersRef);
  const alphabetArray: Array<string> = shuffleArray(
    createAlphabetArray(usersDoc.size)
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
      });
      const gameId = `game${newGameCount}`;
      usersDoc.forEach((userDoc) => {
        const gameRef = doc(
          db,
          `hgs/v1/rooms/${roomId}/users/${userDoc.id}/games/${gameId}`
        );
        const alphabet = alphabetArray.shift();
        transaction.set(gameRef, { userTheme: alphabet, answers: [] });
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};
