import React , { useState }from 'react';
import { Modal } from '../../context/Modal';
import { ModalVerify } from '../../context/Modal';
import { QuizDeckForm } from './QuizDeckForm';
import './CreateDeckButton.css';


const QuizDeckFormModal = () => {

  const [showModal, setShowModal] = useState(false);
  const [verifyClose, setVerifyClose] = useState(false);
  return (
    <>
      <button className="create-deck-buttonn" onClick={() => setShowModal(true)}> <i className="editicon fas fa-pen "></i> <div className=" add-recipe-base-text">Create</div>  </button>

      {verifyClose && (
        <ModalVerify  offVerify={() => setVerifyClose(false)} onClose={() => setShowModal(false)}>
          <div className="close-modal">Are you sure you want to close?</div>
        </ModalVerify>
      )}
      {showModal && (
        // passing a callback that sets state to Modal (true or false) to open/close Modal
        <Modal onClose={() => setVerifyClose(true)} >

          <QuizDeckForm />
        </Modal>
      )}

    </>
  );
}

export default QuizDeckFormModal;
