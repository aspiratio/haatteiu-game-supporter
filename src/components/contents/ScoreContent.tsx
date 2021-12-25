import { useState, VFC } from "react";
import { PrimaryButton, SecondButton, ThirdButton } from "../Buttons";

type Props = {
  usersName: Array<string>;
  allScore: Array<any>;
  gameCount: number;
  isHost: boolean;
  goToNextGame: () => void;
  closeRoom: () => void;
};

export const ScoreContent: VFC<Props> = ({
  usersName,
  allScore,
  gameCount,
  isHost,
  goToNextGame,
  closeRoom,
}) => {
  // 得点一覧表の配列
  const organizedScore: Array<Array<number>> = allScore.map((value, i) => {
    const scoreList: Array<number> = [];
    let sum = 0;
    for (let j = 1; j <= Object.keys(value).length; j++) {
      const score = value[`game${j}`];
      const total = score.act + score.answer;
      sum = sum + total;
      scoreList.push(score.act + score.answer);
    }
    scoreList.push(sum);
    return scoreList;
  });

  const [openedDetail, setOpenedDetail] = useState<false | number>(false);
  const onClickDetailButton = (num: number) => {
    setOpenedDetail(num);
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
                    <th key={i} className="w-12 border-2">
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
                  <tr key={i} className={` border-2 ${bgColor}`}>
                    <th className={`${fontSize}`}>{usersName[i]}</th>
                    {score.map((value, j) => (
                      <td key={j} className="border-2">
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
      {isHost && (
        <div className="text-center space-x-2">
          <PrimaryButton text="次のゲームへ" onClick={goToNextGame} />
          <SecondButton text="ゲーム終了" onClick={closeRoom} />
        </div>
      )}
    </>
  );
};
