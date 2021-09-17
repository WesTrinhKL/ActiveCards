import React , { useState }from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import './CreateWorkspaceModal.css'
import { createWorkspaceThunk, createDirThunk } from '../../../store/workspace_directories';

const CreateWorkspaceModal = ({closeModalHandler, createDir=false, workspace_id}) => {

  const dispatch = useDispatch();

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
    if(!createDir){
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

  }

  const createDirectorySubmit = (e)=>{
    e.preventDefault();
    const payload = {
      name,
      description,
      workspace_id: workspace_id,
    }
    setErrors([]);
    dispatch(createDirThunk(payload)).then( (data)=>{
      if(data && data.id){
        closeModalHandler(false);
        alert("created directory successfully!");
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
                    placeholder={createDir?'name of directory':'name of workspace'}
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

              <div className="create-workspace__button" onClick={createDir && workspace_id?createDirectorySubmit: createWorkspaceSubmit}>Create {createDir?'directory':'workspace'}</div>
            </div>

          </div>

      </Modal>
    </>
  );
}

export default CreateWorkspaceModal
