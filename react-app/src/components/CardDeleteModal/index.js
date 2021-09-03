import React , { useState }from 'react';
import { Modal } from '../../context/Modal';


const CardDeleteModal = ({delete_card_set}) => {

  const [showModal, setShowModal] = useState(false);

  const setCreateFormModal = () => {
    setShowModal(true);
  }


  const instantCloseHandlerDeleteErrors = () => {
    setShowModal(false);
  }

  const delete_card_handler=()=>{
    delete_card_set(true);
    setShowModal(false);
  }


  return (
    <>
     <div  onClick={() => setShowModal(true)}className="scs-bc__delete-card"> <i class="fas fa-trash"></i> </div>


      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          {/* delete confirm modal */}
            <div className="delete-confirm-wrapper">
              <div className="delete-text"> Are you sure you want to <span>delete</span> this card?</div>

              <div className="delete-options-container">
                <div className="button-style-stay" onClick={instantCloseHandlerDeleteErrors}>Don't Delete</div>

                <div className="button-style-exit" onClick={delete_card_handler}>Delete Card</div>
              </div>

            </div>

        </Modal>
      )}

    </>
  );
}

export default CardDeleteModal;
