import { ChangeEvent, useState, VFC } from "react";
import { useHistory } from "react-router";
import { PrimaryButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";

export const CreateRoom: VFC = () => {
  const [userName, setUserName] = useState<string>();
  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const history = useHistory();

  const onClickCreateRoom = () => {
    if (!userName) {
      alert("名前を入力してください");
      return;
    }
    console.log("create room");
    history.push("/host-entrance", { userName });
  };

  return (
    <>
      <div className="w-3/4 sm:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">
        <p className="text-center sm:text-xl md:text-2xl">
          ゲームで表示する名前を入力してください
        </p>
        <div className="flex flex-col space-y-8 items-center mt-7 ">
          <InputBox onChange={onChangeUserName} />
          <PrimaryButton text={"ルーム作成"} onClick={onClickCreateRoom} />
        </div>
      </div>
    </>
  );
};
