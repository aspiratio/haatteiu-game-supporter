import { VFC } from "react";

type Props = {
  themeImg: string;
};

export const ThemeContent: VFC<Props> = ({ themeImg }) => {
  return (
    <img
      className="max-h-60v max-w-full mx-auto mt-3"
      src={themeImg}
      alt="theme"
    />
  );
};
