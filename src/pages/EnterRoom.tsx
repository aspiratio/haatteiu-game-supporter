import { message } from "antd";
import { ChangeEvent, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router";
import { PrimaryButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { addGuestUser } from "../utils/firestore/addGuestUser";

type Params = {
  id: string;
};

export const EnterRoom: VFC = () => {
  const { id } = useParams<Params>();
  const [roomId, setRoomId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id) {
      setRoomId(id);
    }
  }, [id, setRoomId]);

  const onChangeRoomId = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };
  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const history = useHistory();

  const onClickEnterRoom = async () => {
    if (!roomId) {
      message.error("ルームIDを入力してください");
      return;
    } else if (!userName) {
      message.error("名前を入力してください");
      return;
    } else if (userName.length > 6) {
      message.error("名前は6文字以内にしてください");
      return;
    }
    try {
      setIsProcessing(true);
      const userId = await addGuestUser(roomId, userName);
      const userInfo = { roomId, userId, userName, isHost: false };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      history.push(`/guest-entrance`);
    } catch {
      setIsProcessing(false);
    }
    // TODO:途中入室を可能にする必要あり
  };

  return (
    <>
      <div className="text-center w-3/4 sm:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="sm:text-xl md:text-2xl">
          入室するルームIDとゲームで表示する名前を入力してください
        </p>
        <br />
        <div className="flex flex-col space-y-8 items-center mt-7 mb-14 ">
          <div className="text-center">
            <p className="text-xl sm:text-2xl pb-2">ルームID</p>
            <InputBox value={roomId} onChange={onChangeRoomId} />
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl pb-2">名前</p>
            <InputBox onChange={onChangeUserName} />
          </div>
        </div>
        <PrimaryButton
          text={"ルーム入室"}
          onClick={onClickEnterRoom}
          disable={isProcessing}
        />
      </div>
    </>
  );
};
