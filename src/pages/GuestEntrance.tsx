import { useLocation } from "react-router";
import { SecondButton } from "../components/Buttons";
import { Information } from "../components/Information";

// 前ページでuseHistoryでstateを渡している。stateがundefinedのときはエラー表示が出るようにすれば、url直入力で入れなくさせられるはず。
export const GuestEntrance = () => {
  const state = useLocation().state as any;
  console.log(state.roomId);
  return (
    <>
      <Information roomId={state.roomId} userName={state.userName} />
      <div className="flex flex-col h-3/4 justify-center items-center">
        <p className="text-lg sm:text-2xl text-blue-500">
          ゲームの開始を待っています...
        </p>
        <div className="pt-20">
          <SecondButton text={"退室"} />
        </div>
      </div>
    </>
  );
};
