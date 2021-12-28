import {
  arrayUnion,
  collection,
  doc,
  runTransaction,
} from "@firebase/firestore";
import { message } from "antd";
import { db } from "../../service/firebase";

export const addGuestUser = async (roomId: string, userName: string) => {
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  const usersRef = doc(collection(db, `hgs/v1/rooms/${roomId}/users`));
  try {
    await runTransaction(db, async (transaction) => {
      const roomDoc = await transaction.get(roomRef);
      if (!roomDoc.exists()) {
        throw Error("ルームが存在しないか、IDが間違っています");
      }

      const usersName = roomDoc.data().usersName as Array<string>;
      usersName.forEach((name) => {
        if (name === userName) {
          throw Error("他のユーザーと名前が重複しています");
        }
      });

      const gameCount = roomDoc.data().gameCount;
      let defaultScore: { [prop: string]: any } = {};
      // 2ゲーム目以降に入室するユーザーに空のスコアを登録する処理
      if (gameCount !== 0) {
        for (let i = 1; i <= gameCount; i++) {
          defaultScore[`game${i}`] = { act: 0, answer: 0 };
        }
      }
      transaction.set(usersRef, {
        displayName: userName,
        isHost: false,
        actOrder: null,
        answers: [],
        score: defaultScore,
      });
      transaction.update(roomRef, { usersName: arrayUnion(userName) });
    });
    return usersRef.id;
  } catch (e: any) {
    message.error(e.message);
    throw Error();
  }
};
