// ローカルストレージからJSONを取得する関数
export const getObjFromLocalStorage = (key: string) => {
  const getItem = localStorage.getItem(key);
  if (typeof getItem === "string") {
    return JSON.parse(getItem);
  }
};
