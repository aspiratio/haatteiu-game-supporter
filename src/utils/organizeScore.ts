// 得点一覧表の配列を作成する
export const organizeScore = (allScore: Array<any>, gameCount: number) => {
  return allScore.map((value, i) => {
    const scoreList: Array<number> = [];
    let sum = 0;
    for (let j = 1; j <= Object.keys(value).length; j++) {
      const score = value[`game${j}`];
      const total = score.act + score.answer;
      sum = sum + total;
      scoreList.push(score.act + score.answer);
    }
    // 現在のゲームが終了するまでは、得点を0にしておく
    if (!scoreList[gameCount - 1]) scoreList.push(0);
    scoreList.push(sum);
    return scoreList;
  });
};
