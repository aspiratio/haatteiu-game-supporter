import { useState } from "react";
import { GameTabs } from "../components/GameTabs";
import { Information } from "../components/Information";
import { ThemeContent } from "../components/contents/ThemeContent";
import { AnswersContent } from "../components/contents/AnswersContent";
import { PointsContent } from "../components/contents/PointsContent";
import { getObjFromLocalStorage } from "../utils/getObjFromLocalStorage";

export const Game = () => {
  const { userName, roomId, userId } = getObjFromLocalStorage("userInfo");
  const userAlphabet = "A";

  const [actorNumber, setActorNumber] = useState(8);
  // firestoreから取得（演技順をfirestoreに登録する必要あり？）
  const usersName = [
    "ドナルド",
    "スティーブ",
    "太郎",
    "炭治郎",
    "優柔ふだ子",
    "マイケル",
    "ジョブズ",
    "ミーナミーナ",
  ];

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
