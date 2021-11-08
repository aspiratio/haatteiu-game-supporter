import { useState } from "react";

export const useModals = () => {
  const [isOpen, setIsOpen] = useState<boolean | string>(false);
  const openModal = (str?: string) => {
    if (str) {
      setIsOpen(str);
    } else {
      setIsOpen(true);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};
