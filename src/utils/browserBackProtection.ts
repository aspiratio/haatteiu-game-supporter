// ブラウザバックを防止する関数
export const browserBackProtection = () => {
  window.history.pushState(null, "", null);
  window.addEventListener("popstate", () => {
    window.history.pushState(null, "", null);
  });
};
