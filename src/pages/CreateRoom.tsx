import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { ChangeEvent, useState, VFC } from "react";
import { useHistory } from "react-router";
import { PrimaryButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { db } from "../service/firebase";

export const CreateRoom: VFC = () => {
  const [userName, setUserName] = useState<string>();
  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const history = useHistory();

  const onClickCreateRoom = async () => {
    if (!userName) {
      alert("名前を入力してください");
      return;
    }

    const newRoomRef = doc(collection(db, "hgs/v1/rooms"));
    const usersRef = doc(collection(db, `hgs/v1/rooms/${newRoomRef.id}/users`));
    await setDoc(newRoomRef, { createdAt: serverTimestamp() });
    await setDoc(usersRef, { displayName: userName, isHost: true });
    history.push("/host-entrance", { userName });
  };

  return (
    <>
      <div className="w-3/4 sm:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-center sm:text-xl md:text-2xl">
          ゲームで表示する名前を入力してください
        </p>
        <div className="flex flex-col space-y-8 items-center mt-7 ">
          <InputBox onChange={onChangeUserName} />
          <PrimaryButton text={"ルーム作成"} onClick={onClickCreateRoom} />
        </div>
      </div>
    </>
  );
};
