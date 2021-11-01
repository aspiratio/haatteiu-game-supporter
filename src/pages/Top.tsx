import { useState } from "react";
import {
  HowToUseButton,
  StartButton,
  TwitterButton,
} from "../components/Buttons";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";

export const Top = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    console.log(isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="w-3/4 max-w-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center p-3 space-x-2 sm:space-x-4 bg-yellow-50">
          <Link to="create-room">
            <Dialog.Title className="">
              <img
                src={`${process.env.PUBLIC_URL}/CreateRoom.svg`}
                alt="ルームを作成"
              />
            </Dialog.Title>
          </Link>
          <Link to="enter-room">
            <Dialog.Title className="">
              <img
                src={`${process.env.PUBLIC_URL}/EnterRoom.svg`}
                alt="ルームに参加"
              />
            </Dialog.Title>
          </Link>
        </div>
      </Dialog>
      <div className="flex flex-col mx-auto max-w-sm sm:max-w-xl">
        <h2 className="mx-auto mt-10 text-lg sm:text-xl text-gray-500">
          オンライン投票！自動で集計！
        </h2>
        <img
          src={`${process.env.PUBLIC_URL}/TitleImage.svg`}
          alt="オンライン通話+ボードゲーム"
          className=""
        />
      </div>
      <div className="flex flex-col max-w-xs mx-auto sm:max-w-md">
        <StartButton text={"ゲームを始める"} onClick={openModal} />
        <div className="flex space-x-12 justify-center mt-5">
          <TwitterButton />
          <HowToUseButton />
        </div>
      </div>
    </>
  );
};
