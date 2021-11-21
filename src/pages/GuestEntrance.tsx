import { useEffect, useState, VFC } from "react";
import { useHistory, useLocation } from "react-router";
import { SecondButton } from "../components/Buttons";
import { ConfirmModal } from "../components/Modals";
import { Information } from "../components/Information";
import { removeUser } from "../utils/firestore/removeUser";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../service/firebase";

// 前ページでuseHistoryでstateを渡している。stateがundefinedのときはエラー表示が出るようにすれば、url直入力で入れなくさせられるはず。
type State = {
  roomId: string;
  userName: string;
  userId: string;
};

export const GuestEntrance: VFC = () => {
  const location = useLocation<State>();
  const { userName, roomId, userId } = location.state;
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
    history.push("/");
  };

  useEffect(() => {
    return onSnapshot(doc(db, `hgs/v1/rooms/${roomId}`), (doc) => {
      const data = doc.data();
      if (data) {
        if (data.isDuringGame === true) history.push("/game");
      }
    });
  }, [history, roomId]);

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
