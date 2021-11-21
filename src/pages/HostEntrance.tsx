import { useEffect, useState, VFC } from "react";
import { message, Upload } from "antd";
import { useHistory, useLocation } from "react-router";
import {
  PrimaryButton,
  SecondButton,
  ThirdButton,
} from "../components/Buttons";
import { ConfirmModal } from "../components/Modals";
import { useModals } from "../hooks/useModals";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../service/firebase";
import { createNewGame } from "../utils/firestore/createNewGame";

// 前ページでuseHistoryでstateを渡している。stateがundefinedのときは404ページに遷移するようにすれば、url直入力で入れなくさせられるはず。

type State = {
  userName: string;
  roomId: string;
};

export const HostEntrance: VFC = () => {
  const location = useLocation<State>();
  const { userName, roomId } = location.state;
  const [usersName, setUsersName] = useState([userName]);

  useEffect(() => {
    return onSnapshot(doc(db, `hgs/v1/rooms/${roomId}`), (doc) => {
      const data = doc.data();
      if (data) {
        setUsersName(data.usersName);
        console.log("changed");
      }
    });
  }, [roomId]);

  const history = useHistory();
  const { isOpen, openModal, closeModal } = useModals();

  const startGame = async () => {
    try {
      await createNewGame(roomId);
      console.log("Start the game");
      history.push("/game");
    } catch (e) {
      console.log(e);
      alert("通信エラーです。もう一度お試しください");
    }
  };

  const cancelGame = () => {
    console.log("Cancel the game");
    history.push("/");
  };

  const invitingUrl = `https://haateiu-game-supporter/enter-room/${roomId}`;

  const copy = (data: string) => {
    navigator.clipboard.writeText(data);
    message.success("コピーしました");
  };

  return (
    <div className="text-sm w-11/12 sm:w-8/12 h-9/10 mx-auto mt-3 space-y-4">
      <h2 className="text-center font-bold underline text-gray-500">
        ゲーム開始の手順
      </h2>
      <div>
        <p className="mb-2">STEP1 : 下記のどちらかを他の参加者に共有</p>
        <ul className="list-disc list-inside ml-2">
          <li className="space-x-2">
            招待URL：
            <input
              className="w-2/5 sm:w-3/5 sm:max-w-sm px-1"
              readOnly
              value={invitingUrl}
            />
            <ThirdButton
              text={"コピー"}
              onClick={() => copy(invitingUrl)}
              width={12}
            />
          </li>
          <li className="space-x-2">
            ルームID：
            <input
              className="w-2/5 sm:w-3/5 sm:max-w-sm px-1"
              readOnly
              value={roomId}
            />
            <ThirdButton
              text={"コピー"}
              onClick={() => copy(roomId)}
              width={12}
            />
          </li>
        </ul>
      </div>
      <div>
        <div className="flex">
          <p className="whitespace-nowrap mr-1">STEP2 : </p>
          <p>お題カードを一枚選び写真をアップロード</p>
        </div>
        {/* TODO:firestoreと連携してから正式に実装 */}
        <Upload
          name="avatar"
          listType="picture-card"
          className="text-center"
          showUploadList={true}
          maxCount={1}
        >
          アップロード
        </Upload>
      </div>
      <div>
        <p className="mb-1">STEP3 : 参加者が揃ったらゲーム開始</p>
        <ul className="flex flex-wrap ml-8 mb-1">
          {usersName.map((e, i) => {
            return (
              <li key={i} className="w-1/2">
                {e}
              </li>
            );
          })}
        </ul>
        <p className="text-center">参加人数 {usersName.length}人</p>
        <div className="text-center space-x-2 mt-4">
          <PrimaryButton
            text={"ゲーム開始"}
            onClick={() => openModal("start")}
          />
          <SecondButton text={"中止"} onClick={() => openModal("cancel")} />
          <ConfirmModal
            isOpen={isOpen === "start"}
            onClose={closeModal}
            text={"開始してよろしいですか？"}
            onClick={startGame}
          />
          <ConfirmModal
            isOpen={isOpen === "cancel"}
            onClose={closeModal}
            text={"ルーム作成を中止しますか？"}
            onClick={cancelGame}
          />
        </div>
      </div>
    </div>
  );
};
