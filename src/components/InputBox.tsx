import { ChangeEvent, VFC } from "react";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fontSize?: string;
  width?: number;
  height?: number;
};

export const InputBox: VFC<Props> = ({
  onChange,
  fontSize = "xl",
  width = 32,
  height = 8,
}) => {
  return (
    <>
      <input
        onChange={onChange}
        className={`inline-block border-2 rounded-md font-${fontSize} w-${width} h-${height} sm:w-${
          width * 2
        } sm:h-${height * 2} text-center bg-white`}
      />
    </>
  );
};
