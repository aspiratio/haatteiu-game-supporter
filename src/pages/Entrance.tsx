import { useLocation } from "react-router";

// 前ページでuseHistoryでstateを渡している。stateがundefinedのときはエラー表示が出るようにすれば、url直入力で入れなくさせられるはず。
export const Entrance = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <h1>Entranceページです</h1>
    </>
  );
};
