import React , { useState }from 'react';
import { Modal } from '../../context/Modal';


const DeckDeleteModal = ({delete_deck_handler, setshowDeleteModal}) => {


  // const [showModal, setShowModal] = useState(true);

  const instantCloseHandlerDeleteErrors = () => {
    setshowDeleteModal(false);
  }

  const delete_card_handler=()=>{
    delete_deck_handler();
    setshowDeleteModal(false);
  }


  return (
    <>


        <Modal onClose={() => setshowDeleteModal(false)} >
          {/* delete confirm modal */}
            <div className="delete-confirm-wrapper">
              <div className="delete-text"> Are you sure you want to <span>delete</span> this deck?</div>

              <div className="delete-options-container">
                <div className="button-style-stay" onClick={instantCloseHandlerDeleteErrors}>Don't Delete</div>

                <div className="button-style-exit" onClick={delete_card_handler}>Delete Deck</div>
              </div>

            </div>

        </Modal>


    </>
  );
}

export default DeckDeleteModal;
