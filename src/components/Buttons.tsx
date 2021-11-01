import { VFC } from "react";
import "tailwindcss/colors";
import { FaTwitter, FaQuestionCircle } from "react-icons/fa";

// サイズまで固定しているが、必要に応じてサイズを変更するpropsを渡すように書き換えてもいいかも

type Props = {
  text: string;
  onClick?: () => void;
};

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

const PrimaryButton: VFC<Props> = ({ text }) => {
  return (
    <button className="px-6 py-2 text-xl rounded-lg border-2 border-blue-600 bg-blue-500 text-white hover:bg-blue-300">
      {text}
    </button>
  );
};

const SecondButton: VFC<Props> = ({ text }) => {
  return (
    <button className="px-6 py-2 text-xl rounded-lg border-2 bg-blue-100 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-400">
      {text}
    </button>
  );
};

const ThirdButton: VFC<Props> = ({ text }) => {
  return (
    <button className="px-2 py-1 text-md rounded-lg border-2 bg-gray-200 border-gray-500 text-gray-600 hover:text-white hover:bg-gray-500">
      {text}
    </button>
  );
};

const TwitterButton: VFC = () => {
  return (
    <>
      <button className="inline-flex rounded-md shadow-lg bg-blue-400 hover:bg-blue-300">
        <FaTwitter className="h-auto w-auto p-2 rounded-md text-white" />
        <span className="text-sm pr-2 pl-0 my-auto rounded-md text-white">
          ツイート
        </span>
      </button>
    </>
  );
};

const HowToUseButton: VFC = () => {
  return (
    <>
      <button className="inline-flex rounded-md shadow-lg bg-gray-300 hover:bg-gray-400">
        <FaQuestionCircle className="h-auto w-auto p-2 rounded-md" />
        <span className="text-sm pr-2 pl-0 my-auto rounded-md text-gray-500">
          使い方
        </span>
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
