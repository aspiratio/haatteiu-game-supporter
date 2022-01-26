import { VFC } from "react";
import { Link } from "react-router-dom";

export const Page404: VFC = () => {
  return (
    <div className="text-center md:text-xl mt-10v mx-5">
      <img
        src={`${process.env.PUBLIC_URL}/image/404.png`}
        alt="404"
        className="h-20v mx-auto"
      />
      <h1 className="text-2xl lg:text-4xl font-bold my-4">
        ページが見つかりません。
      </h1>
      <p>以下のような理由が考えられます。</p>
      <ul className="list-disc inline-block mt-2 mb-6">
        <li>ページが削除または移動された。</li>
        <li>ご指定のURLが間違っていた。</li>
      </ul>
      <p>
        お手数ですが、
        <Link to="/" className="text-blue-500 font-bold underline">
          トップページ
        </Link>
        よりお探しのページへアクセスしてください
      </p>
    </div>
  );
};
