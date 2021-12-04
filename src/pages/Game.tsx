import { useEffect, useState } from "react";
import { GameTabs } from "../components/GameTabs";
import { Information } from "../components/Information";
import { ThemeContent } from "../components/contents/ThemeContent";
import { AnswersContent } from "../components/contents/AnswersContent";
import { PointsContent } from "../components/contents/PointsContent";
import { getObjFromSessionStorage } from "../utils/getObjFromSessionStorage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";
import { db } from "../service/firebase";

type Type = {
  userName: string;
  roomId: string;
  userId: string;
};

export const Game = () => {
  const { userName, roomId, userId }: Type =
    getObjFromSessionStorage("userInfo");
  const [usersName, setUsersName] = useState<Array<string>>([]);
  const [userAlphabet, setUserAlphabet] = useState("");

  useEffect(() => {
    (async () => {
      const fetchRoom = async () => {
        const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
        const roomSnapshot = await getDoc(roomRef);
        return roomSnapshot.data();
      };
      const fetchUser = async () => {
        const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
        const userSnapshot = await getDoc(userRef);
        return userSnapshot.data();
      };
      const orderByAllUsers = async () => {
        const usersQuery = query(
          collection(db, `hgs/v1/rooms/${roomId}/users`),
          orderBy("actOrder")
        );
        const usersSnapshot = await getDocs(usersQuery);
        return usersSnapshot.docs.map((doc) => {
          return doc.data();
        });
      };

      const roomData = await fetchRoom();
      const correctAnswer = roomData!.correctAnswer as string[];
      const userData = await fetchUser();
      const actOrder = userData!.actOrder;
      setUserAlphabet(correctAnswer[actOrder]);

      const allUsersData = await orderByAllUsers();
      const allUsersName = allUsersData.map((data) => {
        return data.displayName as string;
      });
      setUsersName(allUsersName);
    })();
  }, []);
  // TODO:firestoreとのやりとりを隠匿する

  // const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
  // const userSnapshot = await getDoc(userRef);
  // const userData = userSnapshot.data();

  const [actorNumber, setActorNumber] = useState(0);
  // firestoreから取得（演技順をfirestoreに登録する必要あり？）

  const isFinished = actorNumber === usersName.length;

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
