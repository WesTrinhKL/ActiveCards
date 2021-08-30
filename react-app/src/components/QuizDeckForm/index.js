import React , { useState }from 'react';
import { Modal } from '../../context/Modal';
import { ModalVerify } from '../../context/Modal';
import { QuizDeckForm } from './QuizDeckForm';
import './CreateDeckButton.css';


const QuizDeckFormModal = ({editModeOn}) => {
  // {edit} or {view} mode
  // if edit ... elif view ...
  // depending on mode: display the correct form

  const [showModal, setShowModal] = useState(false);
  const [verifyClose, setVerifyClose] = useState(false);
  return (
    <>

      {!editModeOn && <button className="create-deck-button" onClick={() => setShowModal(true)}> <i class="fas fa-plus create-icon"></i><div className=" add-recipe-base-text">Create</div> </button>}

      {editModeOn && <div className="unc__item" onClick={() => setShowModal(true)}><i className="fas fa-edit basic-style-icon"></i>Edit Banner</div>}

      {verifyClose && (
        <ModalVerify  offVerify={() => setVerifyClose(false)} onClose={() => setShowModal(false)}>
          <div className="close-modal">Are you sure you want to close? All unsaved data will be loss</div>
        </ModalVerify>
      )}
      {/* if view && showModal */}
      {showModal && (
        // passing a callback that sets state to Modal (true or false) to open/close Modal
        <Modal onClose={() => setVerifyClose(true)} >

          <QuizDeckForm editModeOn={editModeOn}/>
        </Modal>
      )}

    </>
  );
}

export default QuizDeckFormModal;
