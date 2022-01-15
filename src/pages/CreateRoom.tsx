import { message } from "antd";
import { ChangeEvent, useState, VFC } from "react";
import { useHistory } from "react-router";
import { PrimaryButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { createNewRoom } from "../utils/firestore/createNewRoom";

export const CreateRoom: VFC = () => {
  const [userName, setUserName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const history = useHistory();

  const onClickCreateRoom = async () => {
    if (!userName) {
      message.error("名前を入力してください");
      return;
    } else if (userName.length > 6) {
      message.error("名前は6文字以内にしてください");
      return;
    }

    try {
      setIsProcessing(true);
      const ids = await createNewRoom(userName);
      const userInfo = { ...ids, userName, isHost: true };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      history.push("/host-entrance");
    } catch (e) {
      setIsProcessing(false);
      message.error("通信エラーです。もう一度お試しください");
    }
  };

  return (
    <>
      <div className="text-center w-9/10 lg:w-3/5 h-90v flex flex-col justify-center m-auto">
        <p className="text-center text-xl lg:text-2xl">
          ゲームで表示する名前を入力してください
        </p>
        <div className="flex flex-col space-y-8 items-center mt-7 w-1/2 sm:w-4/10 mx-auto">
          <InputBox onChange={onChangeUserName} />
          <PrimaryButton
            text={"ルーム作成"}
            onClick={onClickCreateRoom}
            disable={isProcessing}
          />
        </div>
      </div>
    </>
  );
};
