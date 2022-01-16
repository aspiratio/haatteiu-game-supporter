import { VFC } from "react";
import {
  HowToUseButton,
  ShareButtons,
  StartButton,
} from "../components/Buttons";
import { GameStartModal, HowToUseModal } from "../components/Modals";
import { useModals } from "../hooks/useModals";

export const Top: VFC = () => {
  const { isOpen, openModal, closeModal } = useModals();

  return (
    <>
      <GameStartModal isOpen={isOpen === "start"} onClose={closeModal} />
      <HowToUseModal isOpen={isOpen === "how-to-use"} onClose={closeModal} />
      <div className="flex flex-col mx-auto max-w-sm sm:max-w-xl">
        <h2 className="mx-auto mt-10 mb-2 text-lg sm:text-xl text-gray-500">
          オンライン投票！自動で集計！
        </h2>
        <img
          src={`${process.env.PUBLIC_URL}/image/TitleImage.svg`}
          alt="オンライン通話+ボードゲーム"
          className="sm:h-96"
        />
      </div>
      <div className="flex flex-col max-w-xs mx-auto sm:max-w-md">
        <StartButton
          text={"ゲームを始める"}
          onClick={() => openModal("start")}
        />
        <div className="flex justify-center mt-5">
          <ShareButtons shareTitle="タイトル" />
          <div className="ml-8">
            <HowToUseButton
              text={"使い方"}
              onClick={() => {
                openModal("how-to-use");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
