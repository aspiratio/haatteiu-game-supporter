import { useState, VFC } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCloseSquare,
} from "react-icons/ai";
import { DescriptionText } from "./slide/DescriptionText";

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
  const [pageNum, setPageNum] = useState<number>(1);

  const decrementPageNum = () => {
    setPageNum(pageNum - 1);
    if (pageNum <= 1) {
      setPageNum(12);
    }
  };
  const incrementPageNum = () => {
    setPageNum(pageNum + 1);
    if (pageNum >= 12) {
      setPageNum(1);
    }
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={overlay}
      className="w-3/4 max-w-sm h-9/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center text-lg sm:text-2xl shadow-xl bg-yellow-50 z-50 p-1"
    >
      <span className="text-sm absolute top-1 left-1">p{pageNum}/12</span>
      <AiFillCloseSquare
        onClick={onClose}
        className="text-2xl absolute top-0 right-0 cursor-pointer text-gray-500"
      />
      <div className="h-7/10 flex justify-center items-center">
        <AiFillCaretLeft
          onClick={decrementPageNum}
          className="text-2xl cursor-pointer min-w-min pl-1"
        />
        <img
          src={`${process.env.PUBLIC_URL}/image/slide/${pageNum}.svg`}
          alt="使い方解説スライド"
          className="w-8/10 max-w-9/10 max-h-9/10 border-2"
        />
        <AiFillCaretRight
          onClick={incrementPageNum}
          className="text-2xl cursor-pointer min-w-min pr-1"
        />
      </div>
      <div className="h-20v p-1 text-left text-2.5v leading-none">
        <DescriptionText pageNum={pageNum} />
      </div>
    </ReactModal>
  );
};

export { ConfirmModal, GameStartModal, HowToUseModal };
