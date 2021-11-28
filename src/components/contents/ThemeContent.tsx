import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState, VFC } from "react";
import { db } from "../../service/firebase";

type Props = {
  roomId: string;
};

export const ThemeContent: VFC<Props> = ({ roomId }) => {
  const [themeImg, setThemeImg] = useState("");
  useEffect(() => {
    const getImg = async () => {
      const roomDoc = await getDoc(doc(db, `hgs/v1/rooms/${roomId}`));
      const getImage = roomDoc.data()!.themeImg;
      setThemeImg(getImage);
    };
    getImg();
  }, [roomId]);
  return (
    <img
      className="max-h-60v max-w-full mx-auto mt-3"
      src={themeImg}
      alt="theme"
    />
  );
};
