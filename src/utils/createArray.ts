// AからHの中から指定した数だけアルファベットの文字列が並ぶ配列を返す関数
const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const createAlphabetArray = (number: number) => {
  let newAlphabets = [];
  for (let i = 0; i < number; i++) {
    const randomNum = Math.floor(Math.random() * alphabets.length);
    newAlphabets.push(alphabets[randomNum]);
    alphabets.splice(randomNum, 1);
  }
  return newAlphabets;
};

// 指定した数字から数字まで並んだ配列を返す関数
export const createNumberArray = (min: number, max: number) => {
  let number = [];
  for (let i = min; i <= max; i++) {
    number.push(i);
  }
  return number;
};
