// クライアントからのコレクション削除は非推奨（時間がかかるから？）
// 対象のコレクション内のドキュメント数が少ないため、とりあえず許容するが将来的にCloud FunctionsかNodejsで実行する

import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../../service/firebase";

export const deleteRoom = async (roomId: string) => {
  const batch = writeBatch(db);
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  const usersRef = collection(roomRef, "users");
  const usersQuerySnapshot = await getDocs(usersRef);
  usersQuerySnapshot.forEach((usersDoc) => {
    batch.delete(doc(usersRef, usersDoc.id));
  });
  batch.delete(roomRef);
  await batch.commit();
};
