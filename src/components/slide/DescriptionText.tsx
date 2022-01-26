import { VFC } from "react";

type Props = {
  pageNum: number;
};

export const DescriptionText: VFC<Props> = ({ pageNum }) => {
  const texts = () => {
    switch (pageNum) {
      case 1:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">このアプリでできること</h3>
            <p>
              ビデオ通話しながら『はぁって言うゲーム』を遊ぶことができます。
            </p>
            <br />
            <h3 className="font-bold m-1">必要なもの</h3>
            <ul style={{ listStyleType: "disc ", listStylePosition: "inside" }}>
              <li>はぁって言うゲーム 1個</li>
              <li>ビデオ通話 全員</li>
            </ul>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">ルームを作成</h3>
            <p>
              ホストとしてルームを作成します。ホストはお題カードを写真に撮って投稿します。
            </p>
            <h3 className="font-bold mt-2 mx-1 mb-1">ルームに参加</h3>
            <p>ホストが作成したルームに入ります。</p>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">ルーム作成画面1</h3>
            <p>名前を入力してください。</p>
            <p>文字数は6文字までです。</p>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">ルーム作成画面2-1</h3>
            <p>STEP1:</p>
            <p className="pl-2">招待URLかルームIDを参加者に伝えてください。</p>
            <br />
            <p>STEP2:</p>
            <p className="pl-2">
              お題カードの写真を撮り、アップロードしてください。
            </p>
          </>
        );
      case 5:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">ルーム作成画面2-2</h3>
            <p>STEP3:</p>
            <p className="pl-2">ルームに入室した参加者の名前が表示されます。</p>
            <p className="pl-2">参加者が揃ってからゲームを開始してください。</p>
          </>
        );
      case 6:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">ルーム参加画面1</h3>
            <p>ルームIDと名前を入力してください。</p>
            <p>名前の文字数は6文字までです。</p>
          </>
        );
      case 7:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">ルーム参加画面2</h3>
            <p>ホストがゲームを開始するまで、そのままお待ちください。</p>
          </>
        );
      case 8:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">お題画面</h3>
            <p>順番に自分のアルファベットの演技をしてください。</p>
            <br />
            <p>タブで【お題】【回答】【点数】を切り替えます。</p>
          </>
        );
      case 9:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">回答画面1</h3>
            <p>正解だと思うアルファベットを選んで送信してください。</p>
            <br />
            <p>参加者全員が回答を終えると画面が切り替わります。</p>
          </>
        );
      case 10:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">回答画面2</h3>
            <p>
              ゲーム終了後、全員の回答が表示されます。表は横スクロールできます。
            </p>
            <br />
            <p>1人ずつ正解を発表してください。</p>
          </>
        );
      case 11:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">点数画面1</h3>
            <p>各ゲームの点数が表示されます。</p>
            <p>【詳細】ボタンからゲームの得点内訳を確認できます。</p>
          </>
        );
      case 12:
        return (
          <>
            <h3 className="font-bold mx-1 mb-1">点数画面2</h3>
            <p>ホストは下部にボタンが表示されます。</p>
            <p>続けるなら【次のゲームへ】</p>
            <p>終了するなら【ゲーム終了】</p>
            <p>を選択してください。</p>
          </>
        );
      default:
        return <p></p>;
    }
  };

  return <>{texts()}</>;
};
