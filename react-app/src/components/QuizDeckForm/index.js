import React , { useState }from 'react';
import { Modal } from '../../context/Modal';
import { ModalVerify } from '../../context/Modal';
import { QuizDeckForm } from './QuizDeckForm';
import './CreateDeckButton.css';


const QuizDeckFormModal = ({editModeOn, quiz_id}) => {

  const [showModal, setShowModal] = useState(false);
  const [verifyClose, setVerifyClose] = useState(false);
  const [editStateOn, setEditStateOn] = useState(editModeOn)

  const setCreateFormModal = () => {
    setEditStateOn(false);
    setShowModal(true);

  }

  return (
    <>
      {!editStateOn && <button className="create-deck-button" onClick={setCreateFormModal}> <i class="fas fa-plus create-icon"></i><div className=" add-recipe-base-text">Create</div> </button>}

      {editStateOn && <div className="unc__item" onClick={() => setShowModal(true)}><i className="fas fa-edit basic-style-icon"></i>Edit Banner</div>}

      {verifyClose && (
        <ModalVerify  offVerify={() => setVerifyClose(false)} onClose={() => setShowModal(false)}>
          <div className="close-modal">Are you sure you want to close? All unsaved data will be loss</div>
        </ModalVerify>
      )}

      {showModal && (
        // passing a callback that sets state to Modal (true or false) to open/close Modal
        <Modal onClose={() => setVerifyClose(true)} >

          <QuizDeckForm editModeOn={editStateOn} quiz_id={quiz_id}/>
        </Modal>
      )}

    </>
  );
}

export default QuizDeckFormModal;
