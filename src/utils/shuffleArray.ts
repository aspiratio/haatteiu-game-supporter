// 配列の要素をランダムに並べ替えて返す（ダステンフェルドの手法)
export const shuffleArray = (array: Array<any>) => {
  let result = array;
  for (let i = result.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [result[k], result[i - 1]] = [result[i - 1], result[k]];
  }
  return result;
};
