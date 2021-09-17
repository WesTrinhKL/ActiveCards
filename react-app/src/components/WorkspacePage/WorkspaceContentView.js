import React, {useState, useEffect} from 'react'
import { reduceStringIfLongThan } from '../utilities/util'
import { getAllWorkspaceThunk, getAllUsersDecksDefaultDirectoryThunk} from '../../store/workspace_directories'
import { useDispatch } from 'react-redux'
import WorkspaceMetadata from './WorkspaceMetadata/WorkspaceMetadata'
import EditDropDown from '../DropDownComponent/EditDropDown'


const WorkspaceContentView = ({selectedData, workspace_id}) => {
  console.log("workspace data", selectedData)
  const [showDeleteModal, setshowDeleteModal] = useState(false)

  const delete_workspace_handler = async ()=>{
    // const data = await dispatch(deleteDirectoryThunk(dir_id))
    alert("deleted workspace successfully!");
    // window.location.reload();
  }

  return (
    <>{selectedData &&
      <div>
        <div className="wc__content-container">
          <div className="wc-cc__header-wrapper">
            <div className="wc-cc__header">
              <div className="cc-header__bread-crumbs"> <i class="fas fa-home"></i> / {selectedData.name}</div>
              <div>
                <EditDropDown title={'Workspace'} for_directory={true} delete_handler={delete_workspace_handler}/>
              </div>
            </div>
            <div className="wc-cc__header-right"></div>
          </div>

          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              <div className="wc-cc-fc-content__wrapper">
                workspace content

              </div>
            </div>
            <div className="wc-cc-fc__metadata">
              <div></div>

              <WorkspaceMetadata workspace_data={selectedData} />


            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default WorkspaceContentView
