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
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { db } from "../service/firebase";
import { browserBackProtection } from "../utils/browserBackProtection";

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
  const [userActorNumber, setUserActorNumber] = useState<number>();
  const [currentActorNumber, setCurrentActorNumber] = useState(0);
  const [themeImg, setThemeImg] = useState("");

  const isFinished = currentActorNumber === usersName.length;

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

  // TODO:firestoreとのやりとりを隠蔽する
  const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
  const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
  const usersRef = collection(db, `hgs/v1/rooms/${roomId}/users`);

  useEffect(() => {
    browserBackProtection();
    (async () => {
      const fetchRoom = async () => {
        const roomSnapshot = await getDoc(roomRef);
        return roomSnapshot.data();
      };
      const fetchUser = async () => {
        const userSnapshot = await getDoc(userRef);
        return userSnapshot.data();
      };
      const orderByAllUsers = async () => {
        const usersQuery = query(usersRef, orderBy("actOrder"));
        const usersSnapshot = await getDocs(usersQuery);
        return usersSnapshot.docs.map((doc) => {
          return doc.data();
        });
      };

      const roomData = await fetchRoom();
      const correctAnswer: string[] = roomData!.correctAnswer;
      const userData = await fetchUser();
      const actOrder = userData!.actOrder;
      setUserActorNumber(actOrder);
      setUserAlphabet(correctAnswer[actOrder]);

      const getImage: string = roomData!.themeImg;
      setThemeImg(getImage);

      const allUsersData = await orderByAllUsers();
      const allUsersName = allUsersData.map((data) => {
        return data.displayName as string;
      });
      setUsersName(allUsersName);
    })();

    return onSnapshot(usersRef, (snapshot) => {
      const answersLength: Array<number> = [];
      snapshot.forEach((doc) => {
        answersLength.push(doc.data().answers.length);
      });
      const min = answersLength.reduce((a, b) => {
        return Math.min(a, b);
      });
      setCurrentActorNumber(min);
    });
  }, [roomId, roomRef, userId, userRef, usersRef]);

  useEffect(() => {
    isFinished &&
      (async () => {
        const orderByAllUsers = async () => {
          const usersQuery = query(usersRef, orderBy("actOrder"));
          const usersSnapshot = await getDocs(usersQuery);
          return usersSnapshot.docs.map((doc) => {
            return doc.data();
          });
        };
        const allUsersData = await orderByAllUsers();
        const answersArray = allUsersData.map((data) => {
          return data.answers;
        });
        setAllAnswers(answersArray);
        console.log("finished");
      })();
  }, [isFinished, usersRef]);

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
          {currentActorNumber + 1}人目の演者は{usersName[currentActorNumber]}
          さん
        </p>
      )}
      <GameTabs
        activeTab={activeTab}
        onClickTheme={onClickTheme}
        onClickAnswers={onClickAnswers}
        onClickPoints={onClickPoints}
      />
      {activeTab === "theme" && <ThemeContent themeImg={themeImg} />}
      {activeTab === "answers" && (
        <AnswersContent
          roomId={roomId}
          userId={userId}
          usersName={usersName}
          userAlphabet={userAlphabet}
          userActorNumber={userActorNumber}
          currentActorNumber={currentActorNumber}
          isFinished={isFinished}
        />
      )}
      {activeTab === "points" && <PointsContent usersName={usersName} />}
    </>
  );
};
