import { createContext, FC, useState } from "react";

export const InformationContext = createContext({} as any);

export const InformationProvider: FC = ({ children }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  return (
    <InformationContext.Provider
      value={{ roomId, setRoomId, userName, setUserName, userId, setUserId }}
    >
      {children}
    </InformationContext.Provider>
  );
};
