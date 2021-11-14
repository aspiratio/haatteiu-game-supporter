import { useState, VFC } from "react";
import { ThirdButton } from "../Buttons";

type Props = {
  usersName: Array<string>;
};

export const PointsContent: VFC<Props> = ({ usersName }) => {
  const [openedDetail, setOpenedDetail] = useState<false | number>(false);
  const onClickDetailButton = (num: number) => {
    setOpenedDetail(num);
    console.log(num);
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
        <div className="w-9/10 overflow-x-scroll mx-auto mt-2">
          <table className="table-fixed bg-white border-2 whitespace-nowrap writing-mode-vertical-lr">
            <thead>
              <tr>
                <th className="w-20 h-6v writing-mode-horizontal font-thin sticky left-0 z-10 bg-gray-400 text-white">
                  ゲーム数
                </th>
                {usersName.map((name, i) => {
                  const fontSize = name.length <= 5 ? "text-sm" : "text-xs";
                  const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                  return (
                    <th
                      className={`border-2 h-6v writing-mode-horizontal sticky left-0 z-10 ${fontSize} ${bgColor}`}
                      key={name}
                    >
                      {name}
                    </th>
                  );
                })}
                <th className="bg-white border-2 z-10 sticky left-0" />
              </tr>
            </thead>
            <tbody>
              {usersName.map((_, i) => {
                return (
                  <tr key={i}>
                    <th className="w-12 border-2 h-6v writing-mode-horizontal bg-gray-400 text-white">
                      {i + 1}
                    </th>
                    {["13", "12", "10", "8", "11", "13", "10", "9"].map(
                      (num, j) => {
                        const bgColor =
                          j % 2 === 1 ? "bg-white" : "bg-gray-100";
                        return (
                          <td
                            key={j}
                            className={`text-center border-2 h-6v writing-mode-horizontal ${bgColor}`}
                          >
                            {num}
                          </td>
                        );
                      }
                    )}
                    <td className="border-2">
                      <ThirdButton
                        text={"詳細"}
                        onClick={() => onClickDetailButton(i + 1)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {openedDetail !== false && (
        <div className="w-9/10 mx-auto mt-2">
          <table className="mx-auto table-fixed bg-white border-2 whitespace-nowrap writing-mode-vertical-lr">
            <thead>
              <tr>
                <th className="w-20 h-6v writing-mode-horizontal font-thin sticky left-0 z-10 bg-gray-400 text-white">
                  第{openedDetail}ゲーム
                </th>
                {usersName.map((name, i) => {
                  const fontSize = name.length <= 5 ? "text-sm" : "text-xs";
                  const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                  return (
                    <th
                      className={`border-2 h-6v writing-mode-horizontal sticky left-0 z-10 ${fontSize} ${bgColor}`}
                      key={name}
                    >
                      {name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="w-16 border-2 h-6v writing-mode-horizontal bg-gray-400 text-white">
                  演技
                </th>
                {["13", "12", "10", "8", "11", "13", "10", "9"].map(
                  (num, i) => {
                    const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                    return (
                      <td
                        key={i}
                        className={`text-center border-2 h-6v writing-mode-horizontal ${bgColor}`}
                      >
                        {num}
                      </td>
                    );
                  }
                )}
              </tr>
              <tr>
                <th className="w-16 border-2 h-6v writing-mode-horizontal bg-gray-400 text-white">
                  回答
                </th>
                {["13", "12", "10", "8", "11", "13", "10", "9"].map(
                  (num, i) => {
                    const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                    return (
                      <td
                        key={i}
                        className={`text-center border-2 h-6v writing-mode-horizontal ${bgColor}`}
                      >
                        {num}
                      </td>
                    );
                  }
                )}
              </tr>
              <tr>
                <th className="w-16 border-2 h-6v writing-mode-horizontal bg-gray-400 text-white">
                  合計点
                </th>
                {["13", "12", "10", "8", "11", "13", "10", "9"].map(
                  (num, i) => {
                    const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                    return (
                      <td
                        key={i}
                        className={`text-center border-2 h-6v writing-mode-horizontal ${bgColor}`}
                      >
                        {num}
                      </td>
                    );
                  }
                )}
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-2">
            <ThirdButton text="一覧へ戻る" onClick={onClickListButton} />
          </div>
        </div>
      )}
    </>
  );
};
