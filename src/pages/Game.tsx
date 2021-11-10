import { useState } from "react";
import { GameTabs } from "../components/GameTabs";
import { Information } from "../components/Information";
import { ThemeContent } from "../components/contents/ThemeContent";

export const Game = () => {
  // useHistoryで渡すか、firestoreから取得する
  const roomId = "abcdef";
  const userName = "麻歩";
  const userAlphabet = "A";

  const [acterNumber, setActerNumber] = useState(1);
  // firestoreから取得（演技順をfirestoreに登録する必要あり？）
  const users = [
    "ドナルド",
    "スティーブ",
    "太郎",
    "炭治郎",
    "ジョセフィーヌ",
    "マイケル",
    "ジョブズ",
    "ザッカーバーグ",
  ];

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
      {/* 真っ赤な色を追加する */}
      <p className="my-2v text-xl text-center text-vivid-red">
        {acterNumber}人目の演者は{users[acterNumber - 1]}さん
      </p>
      <GameTabs
        activeTab={activeTab}
        onClickTheme={onClickTheme}
        onClickAnswers={onClickAnswers}
        onClickPoints={onClickPoints}
      />
      {activeTab === "theme" && <ThemeContent />}
    </>
  );
};
