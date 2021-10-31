import {
  HowToUseButton,
  StartButton,
  TwitterButton,
} from "../components/Buttons";

export const Top = () => {
  return (
    <>
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
        <StartButton text={"ゲームを始める"} />
        <div className="flex space-x-12 justify-center mt-5">
          <TwitterButton />
          <HowToUseButton />
        </div>
      </div>
    </>
  );
};
