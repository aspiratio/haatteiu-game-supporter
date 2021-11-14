// Aから順番に指定した数だけアルファベットの文字列が並ぶ配列を返す関数
export const createAlphabetArray = (number: number) => {
  let alphabets = [];
  for (let i = 0; i < number; i++) {
    alphabets.push(String.fromCharCode(65 + i));
  }
  return alphabets;
};
