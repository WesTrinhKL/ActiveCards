import React , { useState }from 'react';
import { Modal } from '../../context/Modal';
import { ModalVerify } from '../../context/Modal';
import ViewPreviousAnswers from './ViewPreviousAnswers'
import './ViewPreviousAnswers.css';


const ViewPreviousModal = ({previousAnswers}) => {

  const [showModal, setShowModal] = useState(false);
  const [verifyClose, setVerifyClose] = useState(false);
  return (
    <>
      <div className="" onClick={() => setShowModal(true)}>VIEW PREVIOUS </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} >

          <ViewPreviousAnswers previousAnswers={previousAnswers} onClose={() => setShowModal(false)} />
        </Modal>
      )}

    </>
  );
}

export default ViewPreviousModal;
