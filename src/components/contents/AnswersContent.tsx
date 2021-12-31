import { VFC } from "react";
import { Select } from "antd";
import { PrimaryButton } from "../Buttons";

const { Option } = Select;

type Props = {
  usersName: Array<string>;
  userActorNumber: number | undefined;
  currentActorNumber: number;
  isFinished: boolean;
  answer: string | null;
  sentAnswers: Array<string>;
  allAnswers: Array<Array<string>>;
  selectableOptions: Array<string>;
  onClickSendButton: (value: string | null) => void;
  selectAlphabet: (value: string) => void;
};

export const AnswersContent: VFC<Props> = ({
  usersName,
  userActorNumber,
  currentActorNumber,
  isFinished,
  answer,
  sentAnswers,
  allAnswers,
  selectableOptions,
  onClickSendButton,
  selectAlphabet,
}) => {
  const cellBgColor = (i: number, j: number) => {
    let color = "bg-white";
    if (j === i) {
      color = "bg-gray-400";
    } else if (j % 2 === 1) {
      color = "bg-gray-100";
    }
    return color;
  };

  return (
    <>
      {isFinished ? (
        <div className="w-9/10 max-w-screen-sm overflow-x-auto mx-auto mt-2 ">
          <table
            className={`w-${
              usersName.length * 12
            } h-60v table-fixed text-center mx-auto`}
          >
            <thead>
              <tr className="h-6v">
                <th className="w-24 font-thin sticky left-0 z-10 bg-gray-400 text-white">
                  <span className="text-xs absolute top-1 right-1">演技</span>\
                  <span className="pl-1 text-xs absolute bottom-1 left-0">
                    回答者
                  </span>
                </th>
                {usersName.map((name, i) => {
                  const fontSize = name.length <= 5 ? "text-sm" : "text-xs";
                  const bgColor = i % 2 === 1 ? "bg-gray-100" : "bg-white";
                  return (
                    <th
                      className={`border-2 w-20 ${fontSize} ${bgColor}`}
                      key={name}
                    >
                      {name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {usersName.map((name, i) => {
                const fontSize = name.length <= 5 ? "text-sm" : "text-xs";
                return (
                  <tr key={name}>
                    <th
                      className={`w-20 border-2 sticky left-0 ${fontSize} bg-gray-100`}
                    >
                      {name}
                    </th>
                    {allAnswers[i].map((alphabet, j) => {
                      return (
                        <td
                          key={alphabet}
                          className={`text-center border-2 h-6v ${cellBgColor(
                            i,
                            j
                          )}`}
                        >
                          {j !== i && alphabet}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="m-2 text-sm text-center">
          <p>
            回答を選び送信ボタンを押してください
            <br />
            各アルファベットは1度しか選べません
          </p>
          {currentActorNumber === sentAnswers.length ? (
            currentActorNumber === userActorNumber ? (
              <div className="my-2">
                <PrimaryButton
                  text="演技しました"
                  onClick={() => onClickSendButton("ー")}
                  width={48}
                ></PrimaryButton>
              </div>
            ) : (
              <div className="space-x-8 my-2">
                <Select
                  onChange={selectAlphabet}
                  size="large"
                  className="w-24 text-lg border-2"
                >
                  {selectableOptions.map((option) => {
                    return (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    );
                  })}
                </Select>
                <PrimaryButton
                  text="送信"
                  onClick={() => onClickSendButton(answer)}
                  width={24}
                />
              </div>
            )
          ) : (
            <p className="text-lg my-4 text-blue-500">
              他の人の回答を待っています...
            </p>
          )}
          <div className="text-lg flex justify-center space-x-4">
            <div>
              <p>順番</p>
              <ul>
                {usersName.map((name, i) => {
                  let fontColor;
                  if (i === currentActorNumber) fontColor = "text-vivid-red";
                  return (
                    <li key={name} className={`text-left ${fontColor}`}>
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p>あなたの回答</p>
              <ul>
                {sentAnswers.map((sentAnswer) => {
                  return <li key={sentAnswer}>{sentAnswer}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
