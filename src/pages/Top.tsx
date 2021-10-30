import {
  HowToUseButton,
  PrimaryButton,
  SecondButton,
  StartButton,
  ThirdButton,
  TwitterButton,
} from "../components/Buttons";

export const Top = () => {
  return (
    <>
      <h1>Topページです</h1>
      <StartButton text={"ゲームを始める"} />
      <br />
      <br />
      <PrimaryButton text={"ゲーム開始"} />
      <br />
      <br />
      <SecondButton text={"中止"} />
      <br />
      <br />
      <ThirdButton text={"コピー"} />
      <br />
      <br />
      <TwitterButton />
      <br />
      <br />
      <HowToUseButton />
    </>
  );
};
