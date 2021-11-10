import { VFC } from "react";

type Props = {
  roomId: string;
  userName: string;
  userAlphabet?: string;
};

export const Information: VFC<Props> = ({ roomId, userName, userAlphabet }) => {
  return (
    <div>
      <p>ルームID：{roomId}</p>
      <p>あなた：{userName}</p>
      {userAlphabet && (
        <p className="text-blue-400">あなたのアルファベット：{userAlphabet}</p>
      )}
    </div>
  );
};
