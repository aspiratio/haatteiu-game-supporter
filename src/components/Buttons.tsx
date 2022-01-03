import { VFC } from "react";
import "tailwindcss/colors";
import { FaTwitter, FaQuestionCircle } from "react-icons/fa";

// TODO：型定義から可能な限り？を除く ツイートボタン、使い方ボタンにpropsを持たせる

type Props = {
  text: string;
  onClick: () => void;
  disable?: boolean;
};

// 汎用
const PrimaryButton: VFC<Props> = ({ text, onClick, disable }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`text-xl sm:text-2xl w-full py-1 sm:py-2 rounded-lg border-2 border-blue-600 bg-blue-500 text-white hover:bg-blue-300`}
    >
      {text}
    </button>
  );
};

const SecondButton: VFC<Props> = ({ text, onClick, disable }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`text-xl sm:text-2xl w-full py-1 sm:py-2 rounded-lg border-2 bg-blue-100 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-400`}
    >
      {text}
    </button>
  );
};

const ThirdButton: VFC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-1 py-1 text-xs rounded-lg border-2 bg-gray-200 border-gray-500 text-gray-600 hover:text-white hover:bg-gray-500`}
    >
      {text}
    </button>
  );
};

// 専用
const StartButton: VFC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="shadow-lg px-12 py-8 text-3xl rounded-3xl font-bold bg-yellow-300 text-white  hover:bg-yellow-400 hover:shadow-sm hover:translate-y-0.5 transform transition"
    >
      {text}
    </button>
  );
};

const TwitterButton: VFC<Props> = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="text-base flex rounded-md shadow-lg bg-blue-400 hover:bg-blue-300"
      >
        <FaTwitter className="h-auto w-auto pr-2 pl-3 py-3 my-auto rounded-md text-white" />
        <span className="pr-3 my-auto rounded-md text-white">{text}</span>
      </button>
    </>
  );
};

const HowToUseButton: VFC<Props> = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="text-base flex rounded-md shadow-lg bg-gray-300 hover:bg-gray-400"
      >
        <FaQuestionCircle className="text-xl h-auto w-auto pr-2 pl-4 py-3 my-auto rounded-md" />
        <span className="pr-4 my-auto rounded-md">{text}</span>
      </button>
    </>
  );
};

export {
  StartButton,
  PrimaryButton,
  SecondButton,
  ThirdButton,
  TwitterButton,
  HowToUseButton,
};
