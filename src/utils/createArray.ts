const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H"];
// AからHの中から指定した数だけアルファベットの文字列が並ぶ配列を返す関数
export const createAlphabetArray = (number: number) => {
  let newAlphabets = [];
  for (let i = 0; i < number; i++) {
    const randomNum = Math.floor(Math.random() * alphabets.length);
    newAlphabets.push(alphabets[randomNum]);
    alphabets.splice(randomNum, 1);
  }
  return newAlphabets;
};

export const createNumberArray = (number: number) => {
  let numbers = [];
  for (let i = 0; i < number; i++) {
    numbers.push(i);
  }
  return numbers;
};
