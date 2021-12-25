import { message } from "antd";
import { ChangeEvent, useState, VFC } from "react";
import { useHistory } from "react-router";
import { PrimaryButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { createNewRoom } from "../utils/firestore/createNewRoom";

export const CreateRoom: VFC = () => {
  const [userName, setUserName] = useState<string>("");
  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const history = useHistory();

  const onClickCreateRoom = async () => {
    if (!userName) {
      alert("名前を入力してください");
      return;
    }
    try {
      const ids = await createNewRoom(userName);
      const userInfo = { ...ids, userName, isHost: true };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      history.push("/host-entrance");
    } catch (e) {
      console.log(e);
      message.error("通信エラーです。もう一度お試しください");
    }
  };

  return (
    <>
      <div className="w-3/4 sm:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
