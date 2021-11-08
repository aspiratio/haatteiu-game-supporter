import { useState, VFC } from "react";
import { useHistory, useLocation } from "react-router";
import { SecondButton } from "../components/Buttons";
import { ConfirmModal } from "../components/Modals";
import { Information } from "../components/Information";
import { LeavingRoom } from "../util/LeavingRoom";

// 前ページでuseHistoryでstateを渡している。stateがundefinedのときはエラー表示が出るようにすれば、url直入力で入れなくさせられるはず。
export const GuestEntrance: VFC = () => {
  const state = useLocation().state as any;
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const returnToTopPage = () => {
    LeavingRoom();
    history.push("/");
  };

  return (
    <>
      <Information roomId={state.roomId} userName={state.userName} />
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
