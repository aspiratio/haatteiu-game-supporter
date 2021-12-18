// 得点計算用の関数 正しい回答×1pt加算、自分の演技を当てた人の数×1pt加算
// Firestoreから取得した過去データと現在のデータを合わせて、以下のように整形する
// [{game0: {act: 1, answer: 0}, game1: {act: 1, answer: 0}, game2: {act: 0, answer: 2}},{...},{...}]
export const calculateScore = (
  gameCount: number,
  answers: Array<Array<string>>,
  correctAnswer: Array<string>,
  scores: Array<any>
) => {
  const gameNum = `game${gameCount}`;
  let matchedNumbers: Array<number> = [];

  answers.forEach((answers, i) => {
    const point = { act: 0, answer: 0 };
    answers.forEach((value, i) => {
      if (value === correctAnswer[i]) {
        point.answer++;
        matchedNumbers.push(i);
      }
    });
    scores[i][gameNum] = { ...point };
  });

  matchedNumbers.forEach((number) => {
    scores[number][gameNum].act++;
  });
};
