import { VFC } from "react";

type Props = {
  activeTab: "theme" | "answers" | "points";
  onClickTheme: () => void;
  onClickAnswers: () => void;
  onClickPoints: () => void;
};

export const GameTabs: VFC<Props> = ({
  activeTab,
  onClickTheme,
  onClickAnswers,
  onClickPoints,
}) => {
  let themeButtonColor;
  let answersButtonColor;
  let pointsButtonColor;
  const selectedTextColor = "text-gray-700";
  switch (activeTab) {
    case "theme":
      themeButtonColor = selectedTextColor;
      break;
    case "answers":
      answersButtonColor = selectedTextColor;
      break;
    case "points":
      pointsButtonColor = selectedTextColor;
      break;
  }

  return (
    <div className="text-lg lg:text-xl w-4/5 flex justify-center mx-auto text-gray-300">
      <button
        className={`${themeButtonColor} pr-6 lg:pr-12`}
        onClick={onClickTheme}
      >
        お題
      </button>
      <span>|</span>
      <button
        className={`${answersButtonColor} px-6 lg:px-12`}
        onClick={onClickAnswers}
      >
        回答
      </button>
      <span>|</span>
      <button
        className={`${pointsButtonColor} pl-6 lg:pl-12`}
        onClick={onClickPoints}
      >
        点数
      </button>
    </div>
  );
};
