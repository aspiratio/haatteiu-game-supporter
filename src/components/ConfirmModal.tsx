import { Dialog } from "@headlessui/react";
import { VFC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onClick: () => void;
};

export const ConfirmModal: VFC<Props> = ({
  isOpen,
  onClose,
  text,
  onClick,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="w-3/4 max-w-sm h-1/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center text-lg sm:text-2xl rounded-xl shadow-xl bg-white">
        <Dialog.Description>{text}</Dialog.Description>
        <div className="flex justify-center space-x-4 mt-2 text-white">
          <button
            onClick={onClick}
            className="rounded-md px-5 py-1 shadow-sm bg-yellow-500"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="rounded-md px-5 py-1 bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </Dialog>
  );
};
