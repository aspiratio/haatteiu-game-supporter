import { useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";
import { SecondButton } from "../components/Buttons";
import { ConfirmModal } from "../components/Modals";
import { Information } from "../components/Information";
import { removeUser } from "../utils/firestore/removeUser";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../service/firebase";
import { getObjFromSessionStorage } from "../utils/getObjFromSessionStorage";
import { browserBackProtection } from "../utils/browserBackProtection";

export const GuestEntrance: VFC = () => {
  const { userName, roomId, userId } = getObjFromSessionStorage("userInfo");
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const returnToTopPage = () => {
    removeUser(roomId, userName, userId);
    sessionStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    browserBackProtection();
    return onSnapshot(doc(db, `hgs/v1/rooms/${roomId}`), (doc) => {
      if (!doc) returnToTopPage();
      const data = doc.data();
      if (data) {
        if (data.isDuringGame === true) history.push("/game");
      }
    });
  }, [roomId]);

  return (
    <>
      <Information roomId={roomId} userName={userName} />
      <div className="flex flex-col h-3/4 justify-center items-center">
        <p className="text-lg sm:text-2xl text-blue-500">
          ゲームの開始を待っています...
        </p>
        <div className="pt-20">
          <SecondButton text={"退室"} onClick={openModal} />
        </div>
        <ConfirmModal
          isOpen={isOpen}
          onClose={closeModal}
          text={"ルームを退室しますか？"}
          onClick={returnToTopPage}
        />
      </div>
    </>
  );
};
