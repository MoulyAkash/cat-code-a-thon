import Modal from "../Modal/Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  cancelButtonTitle: string;
  confirmButtonTitle: string;
  onConfirmClick: () => void;
  content: string;
}

export default function ConfirmModal({
  isOpen,
  setIsOpen,
  title,
  description,
  cancelButtonTitle,
  confirmButtonTitle,
  onConfirmClick,
  content,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onModalClose={() => {}}
      title={title}
      description={description}
      modalFooter={
        <>
          <div className="left"></div>
          <div className="right">
            <div
              className="cancel button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {cancelButtonTitle}
            </div>
            <div
              className="save-changes button"
              onClick={() => {
                setIsOpen(false);
                onConfirmClick();
              }}
            >
              {confirmButtonTitle}
            </div>
          </div>
        </>
      }
    >
      <div className="padded-content" style={{fontSize: 14, fontWeight: 500}}>{content}</div>
    </Modal>
  );
}
