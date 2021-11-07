import { VFC } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

export const Header: VFC = () => {
  return (
    <>
      <div className="flex justify-center h-8 p-0.5 bg-yellow-300">
        <h1 className="text-xl font-medium text-white">HGS</h1>
      </div>
      <Menu
        menuButton={
          <MenuButton className="sm:text-lg absolute right-2 top-1 text-yellow-50">
            メニュー
          </MenuButton>
        }
        direction={"bottom"}
        arrow={true}
      >
        <div className="underline text-sm text-gray-500">
          <MenuItem>
            <Link to="/">トップ画面へ</Link>
          </MenuItem>
          <MenuItem>使い方をみる</MenuItem>
        </div>
      </Menu>
    </>
  );
};
