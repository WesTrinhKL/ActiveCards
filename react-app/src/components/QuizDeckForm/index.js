import React , { useState }from 'react';
import { Modal } from '../../context/Modal';
import { ModalVerify } from '../../context/Modal';
import { QuizDeckForm } from './QuizDeckForm';
import './CreateDeckButton.css';
import { deleteFormQuizDeckTempThunk } from '../../store/quiz_deck';
import { useDispatch } from 'react-redux';

const QuizDeckFormModal = ({editModeOn, deleteModeOn, quiz_id}) => {

  const [errors, setErrors] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [verifyClose, setVerifyClose] = useState(false);
  const [editStateOn, setEditStateOn] = useState(editModeOn)
  const [deleteStateOn, setdeleteStateOn] = useState(deleteModeOn)

  const dispatch = useDispatch()

  const setCreateFormModal = () => {
    setEditStateOn(false);
    setShowModal(true);
  }

  const deleteDeckAll = async (id) => {
    // try deleting something that's not yours.
    const data = await dispatch(deleteFormQuizDeckTempThunk(id));

    if (data?.error) setErrors(data.error)
    else{
      setShowModal(false);
      // or wherever they deleted the item from
      setErrors([]);
      window.location.reload();
    }
  }
  const instantCloseHandlerDeleteErrors = () => {
    setErrors([]);
    setShowModal(false);

  }

  return (
    <>
      {!editStateOn && !deleteStateOn && <button className="create-deck-button" onClick={setCreateFormModal}> <i class="fas fa-plus create-icon"></i><div className=" add-recipe-base-text">Create</div> </button>}

      {editStateOn && !deleteStateOn && <div className="unc__item" onClick={() => setShowModal(true)}><i className="fas fa-edit basic-style-icon"></i>Edit Banner</div>}

      {deleteStateOn && !editStateOn && <div className="unc__item" onClick={() => setShowModal(true)}><i class="fas fa-window-close basic-style-icon"></i>Delete All</div>}

      {verifyClose && (
        <ModalVerify  offVerify={() => setVerifyClose(false)} onClose={() => setShowModal(false)}>
          <div className="close-modal">Are you sure you want to close? All unsaved data will be loss</div>
        </ModalVerify>
      )}

      {showModal && (
        // passing a callback that sets state to Modal (true or false) to open/close Modal
        <Modal deleteStateOn={deleteStateOn} instantClose={instantCloseHandlerDeleteErrors} onClose={() => setVerifyClose(true)} >
          {/* view and edit modal */}
          {!deleteStateOn && <QuizDeckForm editModeOn={editStateOn} quiz_id={quiz_id}/>}

          {/* delete confirm modal */}
          {deleteStateOn &&
            <div className="delete-confirm-wrapper">
              <div className="delete-text"> Are you sure you want to <span>delete</span>? This includes <span> all your cards</span></div>

              <div>
              {/* add a general error component later */}
              {errors && errors.map(error => (
                <div className="delete-errors"> *{error}</div>
              ))}
              </div>

              <div className="delete-options-container">
                <div className="button-style-stay" onClick={instantCloseHandlerDeleteErrors}>Don't Delete</div>
                <div className="button-style-exit" onClick={()=> deleteDeckAll(quiz_id)}>Delete All</div>
              </div>

            </div>
          }
        </Modal>
      )}

    </>
  );
}

export default QuizDeckFormModal;
