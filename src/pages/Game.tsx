import { useCallback, useEffect, useState } from "react";
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
import { sendAnswer } from "../utils/firestore/sendAnswer";
import { createAlphabetArray } from "../utils/createArray";

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
  const [allAnswers, setAllAnswers] = useState<Array<Array<string>>>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sentAnswers, setSentAnswers] = useState<Array<string>>([]);

  const allOptions = createAlphabetArray(usersName.length);
  const selectableOptions = allOptions.filter(
    (i) => sentAnswers.indexOf(i) === -1 && i !== userAlphabet
  );

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

  const selectAlphabet = (value: string) => {
    setAnswer(value);
  };

  const onClickSendButton = (value: string | null) => {
    if (value) {
      sendAnswer(roomId, userId, value);
      setSentAnswers([...sentAnswers, value]);
      setAnswer(null);
    }
  };

  // firestoreからのデータ取得
  const fetchRoom = useCallback(async () => {
    const roomRef = doc(db, `hgs/v1/rooms/${roomId}`);
    const roomSnapshot = await getDoc(roomRef);
    return roomSnapshot.data();
  }, [roomId]);
  const fetchUser = useCallback(async () => {
    const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.data();
  }, [roomId, userId]);
  const orderByAllUsers = useCallback(async () => {
    const usersRef = collection(db, `hgs/v1/rooms/${roomId}/users`);
    const usersQuery = query(usersRef, orderBy("actOrder"));
    const usersSnapshot = await getDocs(usersQuery);
    return usersSnapshot.docs.map((doc) => {
      return doc.data();
    });
  }, [roomId]);

  // TODO:firestoreとのやりとりを隠蔽する
  useEffect(() => {
    const usersRef = collection(db, `hgs/v1/rooms/${roomId}/users`);

    let unmount = false;
    browserBackProtection();
    (async () => {
      const roomData = await fetchRoom();
      const correctAnswer: string[] = roomData!.correctAnswer;
      const userData = await fetchUser();
      const actOrder = userData!.actOrder;
      const sentAnswers = userData!.answers;
      const getImage: string = roomData!.themeImg;
      const allUsersData = await orderByAllUsers();
      const allUsersName = allUsersData.map((data) => {
        return data.displayName as string;
      });

      if (!unmount) {
        setUserActorNumber(actOrder);
        setUserAlphabet(correctAnswer[actOrder]);
        setSentAnswers(sentAnswers);
        setThemeImg(getImage);
        setUsersName(allUsersName);
      }
    })();

    const snapshot = onSnapshot(usersRef, (snapshot) => {
      const answersLength: Array<number> = [];
      snapshot.forEach((doc) => {
        answersLength.push(doc.data().answers.length);
      });
      const min = answersLength.reduce((a, b) => {
        return Math.min(a, b);
      });
      setCurrentActorNumber(min);
      console.log("update");
    });
    return () => {
      unmount = true;
      snapshot();
    };
  }, [fetchRoom, fetchUser, orderByAllUsers, roomId]);

  useEffect(() => {
    let unmount = false;
    currentActorNumber !== 0 &&
      currentActorNumber === usersName.length &&
      (async () => {
        const allUsersData = await orderByAllUsers();
        const answersArray = allUsersData.map((data) => {
          return data.answers;
        });

        if (!unmount) {
          setAllAnswers(answersArray);
          setIsFinished(true);
        }
        console.log("finished");
      })();
    return () => {
      unmount = true;
    };
  }, [currentActorNumber, fetchRoom, orderByAllUsers, roomId, usersName]);

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
          usersName={usersName}
          userActorNumber={userActorNumber}
          currentActorNumber={currentActorNumber}
          isFinished={isFinished}
          answer={answer}
          sentAnswers={sentAnswers}
          allAnswers={allAnswers}
          selectableOptions={selectableOptions}
          onClickSendButton={onClickSendButton}
          selectAlphabet={selectAlphabet}
        />
      )}
      {activeTab === "points" && <PointsContent usersName={usersName} />}
    </>
  );
};
