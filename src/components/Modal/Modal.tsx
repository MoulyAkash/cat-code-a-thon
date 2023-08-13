import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onModalClose?: () => void;
  children: React.ReactNode;
  title: string;
  description: string;
  modalFooter: React.ReactNode;
}

export default function Modal({
  isOpen,
  setIsOpen,
  onModalClose,
  children,
  title,
  description,
  modalFooter,
}: ModalProps) {
  return (
    <div className={`modal-container ${isOpen ? "open" : "hidden"}`}>
      <div className={`modal ${isOpen ? "open" : "hidden"}`}>
        <div className="modal-header noselect">
          <div className="left">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div
            className="close-button"
            onClick={() => {
              setIsOpen(false);
              onModalClose && onModalClose();
            }}
          >
            <IoCloseOutline />
          </div>
        </div>
        <div className="modal-content">{children}</div>
        {modalFooter && (
          <div className="modal-footer noselect">{modalFooter}</div>
        )}
      </div>
    </div>
  );
}
