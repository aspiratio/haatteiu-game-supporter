import { ChangeEvent, useState, VFC } from "react";
import { PrimaryButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";

export const EnterRoom: VFC = () => {
  const [roomId, setRoomId] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const onChangeRoomId = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };
  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const onClickCreateRoom = () => {
    if (!roomId) {
      alert("ルームIDを入力してください");
      return;
    } else if (!userName) {
      alert("名前を入力してください");
      return;
    }
    console.log("create room");
  };

  return (
    <>
      <div className="text-center w-3/4 sm:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">
        <p className="sm:text-xl md:text-2xl">
          入室するルームIDとゲームで表示する名前を入力してください
        </p>
        <br />
        <div className="flex flex-col space-y-8 items-center mt-7 mb-14 ">
          <div className="text-center">
            <p className="text-xl sm:text-2xl pb-2">ルームID</p>
            <InputBox onChange={onChangeRoomId} />
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl pb-2">名前</p>
            <InputBox onChange={onChangeUserName} />
          </div>
        </div>
        <PrimaryButton text={"ルーム入室"} onClick={onClickCreateRoom} />
      </div>
    </>
  );
};
