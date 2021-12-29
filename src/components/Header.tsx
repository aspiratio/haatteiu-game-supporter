import { VFC } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useModals } from "../hooks/useModals";
import { ConfirmModal } from "./Modals";

export const Header: VFC = () => {
  const { isOpen, openModal, closeModal } = useModals();
  const location = useLocation();
  const history = useHistory();
  const returnToTopPage = () => {
    closeModal();
    history.push("/");
  };
  const checkLocation = () => {
    if (location.pathname.match(/host-entrance|\/guest-entrance|\/game/)) {
      openModal();
    } else {
      returnToTopPage();
    }
  };

  return (
    <>
      <div className="flex justify-center h-8 p-0.5 bg-yellow-300">
        <button
          onClick={checkLocation}
          className="text-xl font-medium text-white"
        >
          HGS
        </button>
      </div>
      <Menu
        menuButton={
          <MenuButton className="sm:text-lg absolute right-2 top-1 text-yellow-50">
            MENU
          </MenuButton>
        }
        direction={"bottom"}
        arrow={true}
      >
        <div className="underline text-sm text-gray-500">
          <MenuItem>
            <button onClick={checkLocation}>トップ画面へ</button>
          </MenuItem>
          <MenuItem>使い方をみる</MenuItem>
        </div>
      </Menu>
      <ConfirmModal
        isOpen={isOpen === true}
        onClose={closeModal}
        text={"トップページへ戻りますか？"}
        onClick={returnToTopPage}
      />
    </>
  );
};
