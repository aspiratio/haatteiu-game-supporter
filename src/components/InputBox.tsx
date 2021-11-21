import { ChangeEvent, VFC } from "react";

type Props = {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  fontSize?: string;
  width?: number;
  height?: number;
};

export const InputBox: VFC<Props> = ({
  value,
  onChange,
  id,
  fontSize = "xl",
  width = 32,
  height = 8,
}) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        id={id}
        className={`inline-block border-2 rounded-md font-${fontSize} w-${width} h-${height} sm:w-${
          width * 2
        } sm:h-${height * 2} text-center bg-white`}
      />
    </>
  );
};
