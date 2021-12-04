import { useEffect, useState, VFC } from "react";
import { Select } from "antd";
import { createAlphabetArray } from "../../utils/createArray";
import { PrimaryButton } from "../Buttons";
import { sendAnswer } from "../../utils/firestore/sendAnswer";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";

const { Option } = Select;

type Props = {
  roomId: string;
  userId: string;
  usersName: Array<string>;
  userAlphabet: string;
  currentActorNumber: number;
  isFinished: boolean;
};

export const AnswersContent: VFC<Props> = ({
  roomId,
  userId,
  usersName,
  userAlphabet,
  currentActorNumber,
  isFinished,
}) => {
  const [answer, setAnswer] = useState<string | null>(null);
  // firestoreに保存した回答から取得
  const [sentAnswers, setSentAnswers] = useState<Array<string>>([]);

  const allOptions = createAlphabetArray(usersName.length);
  const selectableOptions = allOptions.filter(
    (i) => sentAnswers.indexOf(i) === -1 && i !== userAlphabet
  );

  useEffect(() => {
    const userRef = doc(db, `hgs/v1/rooms/${roomId}/users/${userId}`);
    (async () => {
      const fetchUser = async () => {
        const userSnapshot = await getDoc(userRef);
        return userSnapshot.data();
      };
      const userData = await fetchUser();
      setSentAnswers(userData!.answers);
    })();
  }, [roomId, userId]);

  const handleChange = (value: string) => {
    setAnswer(value);
  };

  const onClickSendButton = () => {
    if (answer) {
      sendAnswer(roomId, userId, answer);
    }
    setAnswer(null);
  };

  return (
    <>
      {isFinished ? (
        <div className="w-9/10 overflow-x-scroll mx-auto mt-2">
          <table className="table-fixed bg-white border-2 whitespace-nowrap writing-mode-vertical-lr">
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
              {usersName.map((name) => {
                const fontSize = name.length <= 5 ? "text-sm" : "text-xs";
                return (
                  <tr key={name}>
                    <th
                      className={`w-20 border-2 h-6v writing-mode-horizontal ${fontSize}`}
                    >
                      {name}
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
