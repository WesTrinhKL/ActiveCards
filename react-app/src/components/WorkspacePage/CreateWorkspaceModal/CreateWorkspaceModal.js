import React , { useState, useEffect }from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { createWorkspaceThunk } from '../../../store/workspace_directories';
import './CreateWorkspaceModal.css'

const CreateWorkspaceModal = ({closeModalHandler}) => {

  const dispatch = useDispatch();

  // const [showModal, setShowModal] = useState(true);
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [errors, setErrors] = useState([]);

  const setnameE = (e) => setname(e.target.value);
  const setdescriptionE = (e) => setdescription(e.target.value);


  const createWorkspaceSubmit = (e)=>{
    e.preventDefault();
    const payload = {
      name,
      description,
    }
    setErrors([]);
    dispatch(createWorkspaceThunk(payload)).then( (data)=>{
      if(data && data.id){

        // setShowModal(false);
        closeModalHandler();
        alert("created workspace successfully!");
      }
      else if(data && data.errors){
        setErrors(data.errors);
      }
      else{
        setErrors(['something went wrong, please try again.'])
      }
    }).catch(async (res) =>{
      console.log("error hit")
      const data = res
      if(data && data.errors) setErrors(data.errors);
    })

  }




  return (
    <>
      <Modal onClose={() => closeModalHandler()} >
          <div className="create-workspace-wrapper">
            {/* <div>Name your workspace</div> */}
            <ul className="error-group">
              {errors.map((error, idx) => <li className="error-text" key={idx}>*{error}</li>)}
            </ul>

            <div className="create-workspace-container">

              <div className="title-input-container create-workspace__items">
                <div>
                  <label className="">
                    Name:
                  </label>
                </div>
                <input className="quiz-deck-form-title"
                    placeholder="Workspace name"
                    required
                    value={name}
                    onChange={setnameE}
                    type="text" />
              </div>

              {/* description */}
              <div className="description-input-container create-workspace__items">
                <label className="">
                  Description (optional):
                </label>
                <div>
                <textarea className="quiz-deck-form-text-area"
                    placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                    value={description}
                    onChange={setdescriptionE}
                    type="text" />
                </div>
              </div>

              <div className="create-workspace__button" onClick={createWorkspaceSubmit}>Create Workspace</div>
            </div>

          </div>

      </Modal>
    </>
  );
}

export default CreateWorkspaceModal
