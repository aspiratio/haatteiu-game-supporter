import { useCallback, useEffect, useState, VFC } from "react";
import { message, Modal, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
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
import { getObjFromSessionStorage } from "../utils/getObjFromSessionStorage";
import { browserBackProtection } from "../utils/browserBackProtection";
import imageCompression from "browser-image-compression";
import { deleteRoom } from "../utils/firestore/deleteRoom";

export const HostEntrance: VFC = () => {
  const { userName, roomId } = getObjFromSessionStorage("userInfo");
  const [usersName, setUsersName] = useState([userName]);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [preview, setPreview] = useState(false);
  const [uploadImg, setUploadImg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const history = useHistory();
  const { isOpen, openModal, closeModal } = useModals();
  const confirmText =
    usersName.length <= 2
      ? "参加者が3人未満です。開始してよろしいですか？"
      : "開始してよろしいですか？";

  useEffect(() => {
    browserBackProtection();
    return onSnapshot(doc(db, `hgs/v1/rooms/${roomId}`), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUsersName(data.usersName);
        console.log("changed");
      }
    });
  }, [roomId]);

  const startGame = async () => {
    if (fileList.length !== 1) {
      message.error("画像をアップロードしてください");
    } else if (usersName.length >= 9) {
      message.error("ゲームに参加できるのは8人までです");
    } else {
      try {
        setIsProcessing(true);
        await createNewGame(roomId, uploadImg);
        console.log("Start the game");
        history.push("/game");
      } catch (e) {
        setIsProcessing(false);
      }
    }
  };

  const cancelGame = () => {
    deleteRoom(roomId);
    console.log("Cancel the game");
    sessionStorage.clear();
    history.push("/");
  };

  const invitingUrl = `https://haatteiu-game-supporter.web.app/enter-room/${roomId}`;

  const copy = (data: string) => {
    navigator.clipboard.writeText(data);
    message.success("コピーしました");
  };

  const checkFormat = async (file: UploadFile<File>) => {
    if (file.type === "image/heic") {
      message.error("HEIC形式の画像には対応していません");
    }
  };

  const onFileChange = useCallback(async ({ fileList: newFileList }) => {
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1920,
    };
    try {
      setFileList(newFileList);
      const compressedImage = await imageCompression(
        newFileList[0].originFileObj,
        options
      );
      const src = await imageCompression.getDataUrlFromFile(compressedImage);
      setUploadImg(src as string);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const previewImg = async () => {
    const image = new Image();
    image.src = uploadImg;
    setPreview(true);
  };

  const cancelPreviewImg = () => {
    setPreview(false);
  };

  // @ts-ignore
  const dummyRequest = (options) => {
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="text-base w-11/12 max-w-xl mx-auto mt-3 space-y-4">
      <h2 className="text-center font-bold underline text-gray-500">
        ゲーム開始の手順
      </h2>
      <div>
        <p className="mb-2">STEP1 : 下記のどちらかを他の参加者に共有</p>
        <ul className="list-disc list-inside ml-2">
          <li className="space-x-2">
            招待URL :
            <input
              className="w-2/5 sm:w-3/5 sm:max-w-sm text-sm px-1"
              readOnly
              value={invitingUrl}
            />
            <ThirdButton text={"コピー"} onClick={() => copy(invitingUrl)} />
          </li>
          <li className="space-x-2">
            ルームID :
            <input
              className="w-2/5 sm:w-3/5 sm:max-w-sm px-1 text-sm"
              readOnly
              value={roomId}
            />
            <ThirdButton text={"コピー"} onClick={() => copy(roomId)} />
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
          className="flex justify-center z-0"
          showUploadList={true}
          maxCount={1}
          fileList={fileList}
          onPreview={previewImg}
          onChange={onFileChange}
        >
          {fileList.length < 1 && "アップロード"}
        </Upload>
        <Modal visible={preview} footer={null} onCancel={cancelPreviewImg}>
          <img alt="example" style={{ width: "100%" }} src={uploadImg} />
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
        <p className="text-center font-bold my-2">
          参加人数 {usersName.length}人
        </p>
        <div className="text-center space-x-2">
          {isProcessing ? (
            <p className="text-lg sm:text-2xl text-blue-500">
              しばらくお待ち下さい...
            </p>
          ) : (
            <div className="space-x-3">
              <div className="w-32 sm:w-48 inline-block">
                <PrimaryButton
                  text={"ゲーム開始"}
                  onClick={() => openModal("start")}
                />
              </div>
              <div className="w-32 sm:w-48 inline-block">
                <SecondButton
                  text={"中止"}
                  onClick={() => openModal("cancel")}
                />
              </div>
              <ConfirmModal
                isOpen={isOpen === "start"}
                onClose={closeModal}
                text={confirmText}
                onClick={startGame}
              />
              <ConfirmModal
                isOpen={isOpen === "cancel"}
                onClose={closeModal}
                text={"ルーム作成を中止しますか？"}
                onClick={cancelGame}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
