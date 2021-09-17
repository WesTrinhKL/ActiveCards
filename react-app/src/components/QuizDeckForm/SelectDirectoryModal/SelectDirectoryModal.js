import React , { useState}from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import './SelectDirectoryModal.css'
// import {  getAllUsersDecksDefaultDirectoryThunk} from '../../../store/workspace_directories';

const SelectDirectoryModal = ({setopenSelectDirModal, allUserWorkspaces, setdirSelected}) => {
  console.log("all workspace", allUserWorkspaces)
  const dispatch = useDispatch();

  // const [selectDir, setselectDir] = useState('')
  const [errors, setErrors] = useState([]);
  const [selectedWorkspace, setselectedWorkspace] = useState('')
  const [selectDirectory, setselectDirectory] = useState('')

  const workspaceCollapsibleDetect = (workspace)=>{
    if(selectedWorkspace === workspace) setselectedWorkspace('')
    else{
      setselectedWorkspace(workspace)
    }
  }
  const setDirectoryHandler = (directory)=>{
    setselectDirectory(directory);
    console.log("directory", directory)
  }

  return (
    <div>
      <Modal onClose={() => setopenSelectDirModal(false)} >
        <div className="select-directory-wrapper">
          <ul className="error-group">
            {errors.map((error, idx) => <li className="error-text" key={idx}>*{error}</li>)}
          </ul>
          <div className="select-directory-container">
            <div className="select-directory-container__title"> Select a child directory</div>
            {/* map each workspace, if workspace clicked, setSelectedWorkspace state and for directory components, if SelectedWorkspace display directories mapped  */}
            {allUserWorkspaces && (
              allUserWorkspaces.map((workspace)=>{
                return (
                  <>
                    {/* selecting workspace */}
                    <div onClick={()=>workspaceCollapsibleDetect(workspace)} className={selectedWorkspace.id === workspace.id ?'workspace-nav workspace-selected': 'workspace-nav'} >{workspace.name}</div>

                    {/* selecting directories */}
                    {workspace.id === selectedWorkspace.id && workspace.directories.map(directory=> <div onClick={()=>setDirectoryHandler(directory)} className='directory-nav' >{directory.name}</div> )}
                  </>)
              })
            )}



            {/* <div className="create-workspace__button" onClick={selectDir? ()=>{setdirSelected(selectDir)}: setErrors(["please select a directory"])}>Select Directory</div> */}
          </div>

        </div>
      </Modal>
    </div>
  )
}

export default SelectDirectoryModal
