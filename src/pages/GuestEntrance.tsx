import { useCallback, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";
import { SecondButton } from "../components/Buttons";
import { ConfirmModal } from "../components/Modals";
import { Information } from "../components/Information";
import { removeUser } from "../utils/firestore/removeUser";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../service/firebase";
import { getObjFromSessionStorage } from "../utils/getObjFromSessionStorage";
import { browserBackProtection } from "../utils/browserBackProtection";
import { message } from "antd";

export const GuestEntrance: VFC = () => {
  const { userName, roomId, userId } = getObjFromSessionStorage("userInfo") ?? {
    userName: "",
    roomId: "",
    userId: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const returnToTopPage = useCallback(() => {
    try {
      removeUser(roomId, userName, userId);
      sessionStorage.clear();
      history.push("/");
    } catch {
      message.error("通信エラーです。もう一度お試しください");
    }
  }, [history, roomId, userId, userName]);

  useEffect(() => {
    if (!roomId || !userId) {
      history.replace("/enter-room");
      return;
    }
    browserBackProtection();
    return onSnapshot(doc(db, `hgs/v1/rooms/${roomId}`), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.isDuringGame === true) history.push("/game");
      } else {
        returnToTopPage();
      }
    });
  }, [history, returnToTopPage, roomId, userId]);

  return (
    <div className="h-90v">
      <div className="absolute ml-2 mt-2">
        <Information roomId={roomId} userName={userName} />
      </div>
      <div className="flex flex-col h-full justify-center items-center">
        <p className="text-lg sm:text-2xl text-blue-500">
          ゲームの開始を待っています...
        </p>
        <div className="pt-20 w-32 md:w-48">
          <SecondButton text={"退室"} onClick={openModal} />
        </div>
        <ConfirmModal
          isOpen={isOpen}
          onClose={closeModal}
          text={"ルームを退室しますか？"}
          onClick={returnToTopPage}
        />
      </div>
    </div>
  );
};
