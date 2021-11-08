import { VFC } from "react";
import "tailwindcss/colors";
import { FaTwitter, FaQuestionCircle } from "react-icons/fa";

// TODO：型定義から可能な限り？を除く ツイートボタン、使い方ボタンにpropsを持たせる

type Props = {
  text: string;
  onClick: () => void;
  fontSize?: number;
  width?: number;
  height?: number;
};

// 汎用
const PrimaryButton: VFC<Props> = ({
  text,
  onClick,
  width = 32,
  height = 8,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-xl sm:text-2xl w-${width} sm:w-${
        width * 2
      } h-${height} sm:h-${
        height * 2
      } rounded-lg border-2 border-blue-600 bg-blue-500 text-white hover:bg-blue-300`}
    >
      {text}
    </button>
  );
};

const SecondButton: VFC<Props> = ({
  text,
  onClick,
  width = 32,
  height = 8,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-xl sm:text-2xl w-${width} sm:w-${
        width * 2
      } h-${height} sm:h-${
        height * 2
      } rounded-lg border-2 bg-blue-100 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-400`}
    >
      {text}
    </button>
  );
};

const ThirdButton: VFC<Props> = ({ text, onClick, width }) => {
  return (
    <button
      onClick={onClick}
      className={`px-1 py-1 text-xs w-${width} rounded-lg border-2 bg-gray-200 border-gray-500 text-gray-600 hover:text-white hover:bg-gray-500`}
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
        className="inline-flex rounded-md shadow-lg bg-blue-400 hover:bg-blue-300"
      >
        <FaTwitter className="h-auto w-auto p-2 rounded-md text-white" />
        <span className="text-sm pr-2 pl-0 my-auto rounded-md text-white">
          {text}
        </span>
      </button>
    </>
  );
};

const HowToUseButton: VFC<Props> = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="inline-flex rounded-md shadow-lg bg-gray-300 hover:bg-gray-400"
      >
        <FaQuestionCircle className="h-auto w-auto p-2 rounded-md" />
        <span className="text-sm pr-2 pl-0 my-auto rounded-md">{text}</span>
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
