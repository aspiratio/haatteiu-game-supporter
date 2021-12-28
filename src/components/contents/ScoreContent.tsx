import { useState, VFC } from "react";
import { useModals } from "../../hooks/useModals";
import { organizeScore } from "../../utils/organizeScore";
import { PrimaryButton, SecondButton, ThirdButton } from "../Buttons";
import { ConfirmModal } from "../Modals";

type Props = {
  usersName: Array<string>;
  allScore: Array<any>;
  gameCount: number;
  isFinished: boolean;
  isHost: boolean;
  goToNextGame: () => void;
  closeRoom: () => void;
  isProcessing: boolean;
};

export const ScoreContent: VFC<Props> = ({
  usersName,
  allScore,
  gameCount,
  isFinished,
  isHost,
  goToNextGame,
  closeRoom,
  isProcessing,
}) => {
  // 得点一覧表の配列
  const organizedScore: Array<Array<number>> = organizeScore(
    allScore,
    gameCount
  );

  const [openedDetail, setOpenedDetail] = useState<false | number>(false);
  const { isOpen, openModal, closeModal } = useModals();

  const onClickDetailButton = (num: number) => {
    if (num < gameCount) setOpenedDetail(num);
  };
  const onClickListButton = () => {
    setOpenedDetail(false);
  };

  // 詳細画面内でゲーム数を切り替えるボタンを実装した時用の関数
  // const onClickPreviousButton = () => {
  //   setOpenedDetail((openedDetail as number) - 1);
  // };

  return (
    <>
      {openedDetail === false && (
        <div className="w-9/10 max-w-screen-sm overflow-x-auto mx-auto mt-2 ">
          <table className="h-55v table-fixed whitespace-nowrap text-center mx-auto">
            <thead>
              <tr className="bg-gray-400 text-white h-6v border-2">
                <th className="w-24 max-w-sm">ゲーム数</th>
                {Array(gameCount)
                  .fill(0)
                  .map((_, i) => (
                    <th key={i} className="border-2">
                      {i + 1}
                    </th>
                  ))}
                <th className="w-12">合計</th>
              </tr>
            </thead>
            <tbody>
              {organizedScore.map((score, i) => {
                const fontSize =
                  usersName[i].length <= 5 ? "text-sm" : "text-xs";
                const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                return (
                  <tr key={i} className={`border-2 ${bgColor}`}>
                    <th className={`${fontSize}`}>{usersName[i]}</th>
                    {score.map((value, j) => (
                      <td key={j} className="w-12 border-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td />
                {Array(gameCount)
                  .fill(0)
                  .map((_, i) => (
                    <td className="h-8v" key={i}>
                      <ThirdButton
                        text={"詳細"}
                        onClick={() => onClickDetailButton(i + 1)}
                      />
                    </td>
                  ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      {openedDetail !== false && (
        <div className="w-9/10 max-w-screen-sm overflow-x-auto mx-auto mt-2 ">
          <table className="w-full h-47v table-fixed whitespace-nowrap text-center mx-auto">
            <thead>
              <tr className="bg-gray-400 text-white font-thin h-6v border-2">
                <th className="w-1/3">第{openedDetail}ゲーム</th>
                <th className="w-1/4 border-2">演技</th>
                <th className="w-1/4 border-2">回答</th>
                <th className="w-1/4">合計</th>
              </tr>
            </thead>
            <tbody>
              {allScore.map((score, i) => {
                const fontSize =
                  usersName[i].length <= 5 ? "text-sm" : "text-xs";
                const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                return (
                  <tr key={i} className={`border-2 ${bgColor}`}>
                    <th className={`${fontSize}`}>{usersName[i]}</th>
                    <td className="border-2">
                      {score[`game${openedDetail}`].act}
                    </td>
                    <td className="border-2">
                      {score[`game${openedDetail}`].answer}
                    </td>
                    <td>
                      {score[`game${openedDetail}`].act +
                        score[`game${openedDetail}`].answer}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="h-8v flex justify-center items-center">
            <ThirdButton text="一覧へ戻る" onClick={onClickListButton} />
          </div>
        </div>
      )}
      {isFinished && isHost && !isProcessing && (
        <div className="text-center space-x-2">
          <PrimaryButton
            text="次のゲームへ"
            onClick={() => openModal("next")}
          />
          <SecondButton text="ゲーム終了" onClick={() => openModal("finish")} />
          <ConfirmModal
            isOpen={isOpen === "next"}
            onClose={closeModal}
            text={"もう1ゲーム遊びますか？"}
            onClick={goToNextGame}
          />
          <ConfirmModal
            isOpen={isOpen === "finish"}
            onClose={closeModal}
            text={"ゲームを終了しますか？"}
            onClick={closeRoom}
          />
        </div>
      )}
    </>
  );
};
