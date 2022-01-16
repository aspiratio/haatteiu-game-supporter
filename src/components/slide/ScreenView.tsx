import { VFC } from "react";
import { createNumberArray } from "../../utils/createArray";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";

type Props = {
  index: number;
  maxPage: number;
  onChangeIndex: (index: number) => void;
};

export const ScreenView: VFC<Props> = ({ index, maxPage, onChangeIndex }) => {
  const pages = createNumberArray(1, maxPage);
  const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

  return (
    <BindKeyboardSwipeableViews
      enableMouseEvents
      index={index}
      onChangeIndex={() => onChangeIndex}
    >
      {pages.map((page) => {
        return (
          <img
            src={`${process.env.PUBLIC_URL}/image/slide/${page}.svg`}
            alt="使い方解説スライド"
            className="w-8/10 max-w-9/10 max-h-9/10 border-2"
          />
        );
      })}
    </BindKeyboardSwipeableViews>
  );
};
