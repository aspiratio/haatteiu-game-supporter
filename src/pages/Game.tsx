import { Information } from "../components/Information";

export const Game = () => {
  // useHistoryで渡すか、firestoreから取得する
  const roomId = "abcdef";
  const userName = "麻歩";
  const userAlphabet = "A";

  return (
    <>
      <Information
        roomId={roomId}
        userName={userName}
        userAlphabet={userAlphabet}
      />
    </>
  );
};
