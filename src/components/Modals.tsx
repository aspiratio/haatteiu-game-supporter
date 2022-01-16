import { VFC } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { ScreenView } from "./slide/ScreenView";

ReactModal.setAppElement("body");
// モーダルを開いたときの背景を暗くするため（その他のスタイルはtailwind cssであてる）
const overlay = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
  },
};

type Modal = {
  isOpen: boolean;
  onClose: () => void;
  text?: string;
  onClick?: () => void;
};

// 処理を実行して良いか確認するためのモーダル
const ConfirmModal: VFC<Modal> = ({ isOpen, onClose, text, onClick }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={overlay}
      className="w-3/4 max-w-sm h-1/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center text-lg sm:text-2xl rounded-xl shadow-xl bg-yellow-50 z-50"
    >
      <p>{text}</p>
      {onClick && (
        <div className="flex justify-center space-x-4 mt-2 text-white">
          <button
            onClick={onClick}
            className="rounded-md px-5 py-1 shadow-sm bg-yellow-500"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="rounded-md px-5 py-1 bg-gray-400"
          >
            No
          </button>
        </div>
      )}
    </ReactModal>
  );
};

// トップページ用のスタートモーダル
const GameStartModal: VFC<Modal> = ({ isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={overlay}
      className="w-3/4 max-w-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center p-3 space-x-2 sm:space-x-4 bg-yellow-50"
    >
      <Link to="create-room">
        <img
          src={`${process.env.PUBLIC_URL}/image/CreateRoom.svg`}
          alt="ルームを作成"
        />
      </Link>
      <Link to="enter-room">
        <img
          src={`${process.env.PUBLIC_URL}/image/EnterRoom.svg`}
          alt="ルームに参加"
        />
      </Link>
    </ReactModal>
  );
};

// 使い方表示用モーダル
const HowToUseModal: VFC<Modal> = ({ isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={overlay}
      className="w-3/4 max-w-md lg:max-w-lg h-9/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center text-lg sm:text-2xl shadow-xl bg-yellow-50 z-50 p-1"
    >
      <AiFillCloseSquare
        onClick={onClose}
        className="text-2xl absolute top-0 right-0 cursor-pointer text-gray-500 z-50"
      />
      <div className="h-full w-full p-2 flex justify-center">
        <ScreenView />
      </div>
    </ReactModal>
  );
};

export { ConfirmModal, GameStartModal, HowToUseModal };
