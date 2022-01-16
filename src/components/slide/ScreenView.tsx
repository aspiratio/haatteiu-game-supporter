import { VFC } from "react";
import { createNumberArray } from "../../utils/createArray";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { DescriptionText } from "./DescriptionText";

export const ScreenView: VFC = () => {
  // 今後使い方以外にスライドを実装するなら、コンポーネントを切り分ける必要あり
  const maxPage = 12;
  const pages = createNumberArray(1, maxPage);
  const params = {
    slidesPerView: 1,
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  };

  return (
    <Swiper {...params}>
      {pages.map((page) => {
        return (
          <div
            key={page}
            className="flex flex-col justify-center items-center "
          >
            <div className="h-50v">
              <img
                src={`${process.env.PUBLIC_URL}/image/slide/${page}.svg`}
                alt="使い方解説スライド"
                className="w-auto h-full border-2"
              />
            </div>
            <div className="h-1/2 px-2 pt-3 md:px-4 text-left text-2.5v leading-none">
              <DescriptionText pageNum={page} />
            </div>
          </div>
        );
      })}
    </Swiper>
  );
};
