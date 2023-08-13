import React, { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import sound from "../../assets/moosic.mp3";
import "./modal.css";
import APIService from "../../api/Service";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 30,
  },
};

const ModalComp = forwardRef((props, ref) => {
  const spo2 = "95%";
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
    new Audio(sound).play();
  };

  const continueButton = () => {
    setIsOpen(false);
  };

  const quitButton = () => {
    //Your code here
    APIService.PostData(
      {
        fname: "first",
        lname: "last",
        age: 29,
        spo2: 95,
      },
      "add"
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={continueButton}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-wrapper">
        <div className="msg">
          You seem to be drowsy. We recommend you reconsider continuing to
          drive.
        </div>
        <div className="spo2-level">Your SPO2 Level: {spo2}</div>

        <div className="button-wrapper">
          <div className="modal-button" onClick={continueButton}>
            Continue to drive
          </div>
          <div className="modal-button" onClick={quitButton}>
            Quit
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default ModalComp;
