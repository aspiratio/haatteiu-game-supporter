import { useCallback, useEffect, useMemo, useState } from "react";
import { GameTabs } from "../components/GameTabs";
import { Information } from "../components/Information";
import { ThemeContent } from "../components/contents/ThemeContent";
import { AnswersContent } from "../components/contents/AnswersContent";
import { ScoreContent } from "../components/contents/ScoreContent";
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
import { calculateScore } from "../utils/calculateScore";
import { updateScore } from "../utils/firestore/updateScore";

type Info = {
  userName: string;
  roomId: string;
  userId: string;
};
type Tab = "theme" | "answers" | "points";

export const Game = () => {
  const { userName, roomId, userId }: Info = useMemo(() => {
    return getObjFromSessionStorage("userInfo");
  }, []);

  const [currentGameCount, setCurrentGameCount] = useState<number>(0);
  const [usersName, setUsersName] = useState<Array<string>>([]);
  const [userAlphabet, setUserAlphabet] = useState("");
  const [userActorNumber, setUserActorNumber] = useState<number>();
  const [currentActorNumber, setCurrentActorNumber] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("theme");
  const [themeImg, setThemeImg] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sentAnswers, setSentAnswers] = useState<Array<string>>([]);
  const [allAnswers, setAllAnswers] = useState<Array<Array<string>>>([]);
  const [allScore, setAllScore] = useState<Array<any>>([]);

  const allOptions = createAlphabetArray(usersName.length);
  const selectableOptions = allOptions.filter(
    (i) => sentAnswers.indexOf(i) === -1 && i !== userAlphabet
  );

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

  // firestoreからのデータ取得 TODO: フロントから隠蔽する
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
      const correctAnswer: Array<string> = roomData!.correctAnswer;
      const userData = await fetchUser();
      const actOrder = userData!.actOrder;
      const sentAnswers = userData!.answers;
      const gameCount = roomData!.gameCount;
      const getImage: string = roomData!.themeImg;
      const allUsersData = await orderByAllUsers();
      const allUsersName = allUsersData.map((data) => {
        return data.displayName as string;
      });

      if (!unmount) {
        setCurrentGameCount(gameCount);
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
        const roomData = await fetchRoom();
        const allUsersData = await orderByAllUsers();
        const answersArray = allUsersData.map((data) => {
          return data.answers as Array<string>;
        });
        const scoreArray = allUsersData.map((data) => {
          return data.score;
        });
        const correctAnswer = roomData!.correctAnswer;
        calculateScore(
          currentGameCount,
          answersArray,
          correctAnswer,
          scoreArray
        );
        updateScore(roomId, userId, scoreArray[userActorNumber!]);

        if (!unmount) {
          setAllAnswers(answersArray);
          setIsFinished(true);
          setAllScore(scoreArray);
        }
        console.log("finished");
      })();
    return () => {
      unmount = true;
    };
  }, [
    currentActorNumber,
    currentGameCount,
    fetchRoom,
    orderByAllUsers,
    roomId,
    userActorNumber,
    userId,
    usersName,
  ]);

  return (
    <>
      <Information
        roomId={roomId}
        userName={userName}
        userAlphabet={userAlphabet}
      />
      {currentActorNumber !== 0 && currentActorNumber === usersName.length ? (
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
      {activeTab === "points" && (
        <ScoreContent
          usersName={usersName}
          allScore={allScore}
          gameCount={currentGameCount}
        />
      )}
    </>
  );
};
