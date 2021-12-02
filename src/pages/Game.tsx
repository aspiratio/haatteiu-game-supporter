import { useState } from "react";
import { GameTabs } from "../components/GameTabs";
import { Information } from "../components/Information";
import { ThemeContent } from "../components/contents/ThemeContent";
import { AnswersContent } from "../components/contents/AnswersContent";
import { PointsContent } from "../components/contents/PointsContent";
import { getObjFromSessionStorage } from "../utils/getObjFromSessionStorage";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "../service/firebase";

export const Game = () => {
  const { userName, roomId, userId } = getObjFromSessionStorage("userInfo");
  // TODO:firestoreとのやりとりを隠匿する
  const fetchRoom = async () => {
    const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
    const roomSnapshot = await getDoc(roomRef);
    return roomSnapshot.data();
  };
  const roomData = fetchRoom();

  const fetchAllUsers = async () => {
    const usersCollection = collection(db, `hgs/v1/rooms/${roomId}/users`);
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.docs.map((doc) => {
      return doc.data();
    });
  };
  console.log(fetchAllUsers());
  // const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
  // const userSnapshot = await getDoc(userRef);
  // const userData = userSnapshot.data();

  const [actorNumber, setActorNumber] = useState(0);
  // firestoreから取得（演技順をfirestoreに登録する必要あり？）
  const usersName = ["a"];
  const userAlphabet = "a";

  const isFinished = actorNumber === usersName.length;

  // (async () => {
  //   const usersRef = collection(db, `hgs/v1/rooms/${roomId}/users`);
  //   const usersDoc = await getDocs(usersRef);
  //   const usersOrder = new Array(usersDoc.size)
  //   usersDoc.forEach((userDoc) => {
  //     const actOrder = userDoc.data().actOrder as number
  //     usersOrder[actOrder] =
  //   })
  // })();

  type Tab = "theme" | "answers" | "points";
  const [activeTab, setActiveTab] = useState<Tab>("theme");
  const onClickTheme = () => {
    setActiveTab("theme");
  };
  const onClickAnswers = () => {
    setActiveTab("answers");
  };
  const onClickPoints = () => {
    setActiveTab("points");
  };

  return (
    <>
      <Information
        roomId={roomId}
        userName={userName}
        userAlphabet={userAlphabet}
      />
      {isFinished ? (
        <p className="h-10v flex justify-center items-center text-vivid-red">
          全員の演技が終わりました
          <br />
          正解を発表し点数を確認してください
        </p>
      ) : (
        <p className="h-10v flex text-xl justify-center items-center text-vivid-red">
          {actorNumber + 1}人目の演者は{usersName[actorNumber]}さん
        </p>
      )}
      <GameTabs
        activeTab={activeTab}
        onClickTheme={onClickTheme}
        onClickAnswers={onClickAnswers}
        onClickPoints={onClickPoints}
      />
      {activeTab === "theme" && <ThemeContent roomId={roomId} />}
      {activeTab === "answers" && (
        <AnswersContent
          usersName={usersName}
          actorNumber={actorNumber}
          isFinished={isFinished}
        />
      )}
      {activeTab === "points" && <PointsContent usersName={usersName} />}
    </>
  );
};
