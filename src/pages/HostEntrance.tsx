import { useCallback, useEffect, useState, VFC } from "react";
import { message, Modal, Upload } from "antd";
import { useHistory } from "react-router";
import {
  PrimaryButton,
  SecondButton,
  ThirdButton,
} from "../components/Buttons";
import { ConfirmModal } from "../components/Modals";
import { useModals } from "../hooks/useModals";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../service/firebase";
import { createNewGame } from "../utils/firestore/createNewGame";
import { getObjFromLocalStorage } from "../utils/getObjFromLocalStorage";
import { browserBackProtection } from "../utils/browserBackProtection";
import { UploadFile } from "antd/lib/upload/interface";

export const HostEntrance: VFC = () => {
  const { userName, roomId } = getObjFromLocalStorage("userInfo");
  const [usersName, setUsersName] = useState([userName]);

  useEffect(() => {
    browserBackProtection();
    return onSnapshot(doc(db, `hgs/v1/rooms/${roomId}`), (doc) => {
      const data = doc.data();
      if (data) {
        setUsersName(data.usersName);
        console.log("changed");
      }
    });
  }, [roomId]);

  const history = useHistory();
  const { isOpen, openModal, closeModal } = useModals();

  const startGame = async () => {
    try {
      await createNewGame(roomId);
      console.log("Start the game");
      history.push("/game");
    } catch (e) {
      console.log(e);
      alert("通信エラーです。もう一度お試しください");
    }
  };

  const cancelGame = () => {
    console.log("Cancel the game");
    localStorage.clear();
    history.push("/");
  };

  const invitingUrl = `https://haateiu-game-supporter/enter-room/${roomId}`;

  const copy = (data: string) => {
    navigator.clipboard.writeText(data);
    message.success("コピーしました");
  };

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [preview, setPreview] = useState({
    visible: false,
    src: "",
  });

  const checkFormat = (file: UploadFile<File>) => {
    if (file.type === "image/heic") {
      message.error("HEIC形式の画像には対応していません");
    }
  };

  const onFileChange = useCallback(({ fileList: newFileList }) => {
    setFileList(newFileList);
  }, []);

  const cancelPreviewImg = () => {
    setPreview({
      ...preview,
      visible: false,
    });
  };

  // @ts-ignore
  const dummyRequest = (options) => {
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const previewImg = async (file: UploadFile<File>) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj!);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    }
    if (src) {
      const image = new Image();
      image.src = src;
      console.log(src);

      setPreview({
        visible: true,
        src,
      });
    }
  };

  return (
    <div className="text-sm w-11/12 sm:w-8/12 h-9/10 mx-auto mt-3 space-y-4">
      <h2 className="text-center font-bold underline text-gray-500">
        ゲーム開始の手順
      </h2>
      <div>
        <p className="mb-2">STEP1 : 下記のどちらかを他の参加者に共有</p>
        <ul className="list-disc list-inside ml-2">
          <li className="space-x-2">
            招待URL：
            <input
              className="w-2/5 sm:w-3/5 sm:max-w-sm px-1"
              readOnly
              value={invitingUrl}
            />
            <ThirdButton
              text={"コピー"}
              onClick={() => copy(invitingUrl)}
              width={12}
            />
          </li>
          <li className="space-x-2">
            ルームID：
            <input
              className="w-2/5 sm:w-3/5 sm:max-w-sm px-1"
              readOnly
              value={roomId}
            />
            <ThirdButton
              text={"コピー"}
              onClick={() => copy(roomId)}
              width={12}
            />
          </li>
        </ul>
      </div>
      <div>
        <div className="flex">
          <p className="whitespace-nowrap mr-1">STEP2 : </p>
          <p>お題カードを一枚選び写真をアップロード</p>
        </div>
        <Upload
          beforeUpload={checkFormat}
          customRequest={dummyRequest}
          name="theme"
          listType="picture-card"
          className="flex justify-center"
          showUploadList={true}
          maxCount={1}
          fileList={fileList}
          onPreview={previewImg}
          onChange={onFileChange}
        >
          {fileList.length < 1 && "アップロード"}
        </Upload>
        <Modal
          visible={preview.visible}
          footer={null}
          onCancel={cancelPreviewImg}
        >
          <img alt="example" style={{ width: "100%" }} src={preview.src} />
        </Modal>
      </div>
      <div>
        <p className="mb-1">STEP3 : 参加者が揃ったらゲーム開始</p>
        <ul className="flex flex-wrap ml-8 mb-1">
          {usersName.map((e, i) => {
            return (
              <li key={i} className="w-1/2">
                {e}
              </li>
            );
          })}
        </ul>
        <p className="text-center">参加人数 {usersName.length}人</p>
        <div className="text-center space-x-2 mt-4">
          <PrimaryButton
            text={"ゲーム開始"}
            onClick={() => openModal("start")}
          />
          <SecondButton text={"中止"} onClick={() => openModal("cancel")} />
          <ConfirmModal
            isOpen={isOpen === "start"}
            onClose={closeModal}
            text={"開始してよろしいですか？"}
            onClick={startGame}
          />
          <ConfirmModal
            isOpen={isOpen === "cancel"}
            onClose={closeModal}
            text={"ルーム作成を中止しますか？"}
            onClick={cancelGame}
          />
        </div>
      </div>
    </div>
  );
};
