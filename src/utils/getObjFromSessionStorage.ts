// ローカルストレージからJSONを取得する関数
export const getObjFromSessionStorage = (key: string) => {
  const getItem = sessionStorage.getItem(key);
  if (typeof getItem === "string") {
    return JSON.parse(getItem);
  }
};
