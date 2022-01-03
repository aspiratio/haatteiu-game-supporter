import { ChangeEvent, VFC } from "react";

type Props = {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
};

export const InputBox: VFC<Props> = ({ value, onChange, id }) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        id={id}
        className={`inline-block border-2 text-xl md:text-2xl rounded-md w-full py-1 sm:py-2 text-center bg-white`}
      />
    </>
  );
};
