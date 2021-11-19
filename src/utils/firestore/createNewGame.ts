import { collection, doc, getDocs, setDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";
import { createAlphabetArray } from "../createAlphabetArray";
import { shuffleArray } from "../shuffleArray";

export const createNewGame = async (roomId: string) => {
  const usersRef = collection(db, `hgs/v1/rooms/${roomId}/users`);
  const users = await getDocs(usersRef);
  const alphabetArray = shuffleArray(createAlphabetArray(users.size));
  users.forEach((userDoc) => {
    const gameRef = doc(
      collection(db, `hgs/v1/rooms/${roomId}/users/${userDoc.id}/games`)
    );
    const alphabet = alphabetArray.shift();
    setDoc(gameRef, { userTheme: alphabet, answers: [] });
  });
};
