import { useState, VFC } from "react";
import { Select } from "antd";
import { createAlphabetArray } from "../../utils/createAlphabetArray";
import { PrimaryButton } from "../Buttons";

const { Option } = Select;

type Props = {
  usersName: Array<string>;
  actorNumber: number;
  isFinished: boolean;
};

export const AnswersContent: VFC<Props> = ({
  usersName,
  actorNumber,
  isFinished,
}) => {
  const [answer, setAnswer] = useState<string | null>(null);
  // firestoreに保存した回答から取得
  const sentAnswers = ["D", "C", "F"];

  const allOptions = createAlphabetArray(usersName.length);
  const selectableOptions = allOptions.filter(
    (i) => sentAnswers.indexOf(i) === -1
  );

  const handleChange = (value: string) => {
    setAnswer(value);
  };

  const onClickSendButton = () => {
    console.log(`send ${answer}`);
  };

  return (
    <>
      {isFinished ? (
        <div className="w-9/10 overflow-x-scroll mx-auto mt-2">
          <table className="table-fixed bg-white border-2 whitespace-nowrap w-32 writing-mode-vertical-lr">
            <thead>
              <tr>
                <th className="w-20 h-6v text-lg font-thin sticky left-0 z-10 bg-gray-400 text-white">
                  <span className="text-xs absolute top-0 right-0 writing-mode-horizontal">
                    回答者
                  </span>
                  /
                  <span className="pl-1 text-xs absolute bottom-0 left-0 writing-mode-horizontal">
                    演技
                  </span>
                </th>
                {usersName.map((userName, i) => {
                  const fontSize = userName.length <= 5 ? "text-sm" : "text-xs";
                  const bgColor = i % 2 === 1 ? "bg-white" : "bg-gray-100";
                  return (
                    <th
                      className={`w-20 border-2 h-6v writing-mode-horizontal sticky left-0 z-10 ${fontSize} ${bgColor}`}
                      key={userName}
                    >
                      {userName}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {usersName.map((userName) => {
                const fontSize = userName.length <= 5 ? "text-sm" : "text-xs";
                return (
                  <tr key={userName}>
                    <th
                      className={`w-20 border-2 h-6v writing-mode-horizontal ${fontSize}`}
                    >
                      {userName}
                    </th>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map(
                      (alphabet, i) => {
                        const bgColor =
                          i % 2 === 1 ? "bg-white" : "bg-gray-100";
                        return (
                          <td
                            key={alphabet}
                            className={`text-center border-2 h-6v writing-mode-horizontal ${bgColor}`}
                          >
                            {alphabet}
                          </td>
                        );
                      }
                    )}
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
          <div className="space-x-8 my-2">
            <Select
              onChange={handleChange}
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
              onClick={onClickSendButton}
              width={24}
              height={10}
            />
          </div>
          <div className="text-lg flex justify-center space-x-4">
            <div>
              <p>順番</p>
              <ul>
                {usersName.map((userName, i) => {
                  let fontColor;
                  if (i === actorNumber) fontColor = "text-vivid-red";
                  return (
                    <li key={userName} className={`text-left ${fontColor}`}>
                      {userName}
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
