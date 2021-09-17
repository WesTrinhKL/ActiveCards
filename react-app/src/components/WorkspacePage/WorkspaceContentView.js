import React, {useState, useEffect} from 'react'
import { reduceStringIfLongThan, process_date, getDateOnlyFromString} from '../utilities/util'
import { getAllWorkspaceThunk, getAllUsersDecksDefaultDirectoryThunk, deleteWorkspaceThunk} from '../../store/workspace_directories'
import { useDispatch } from 'react-redux'
import WorkspaceMetadata from './WorkspaceMetadata/WorkspaceMetadata'
import EditDropDown from '../DropDownComponent/EditDropDown'


const WorkspaceContentView = ({selectedData, workspace_id}) => {
  const dispatch = useDispatch()
  console.log("workspace data", selectedData)

  const delete_workspace_handler = async ()=>{
    const data = await dispatch(deleteWorkspaceThunk(workspace_id))
    alert("deleted workspace successfully!");
    window.location.reload();
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
                <div className="wc-cc-fc-content__header-container">
                  <div className="header-container__head">Directory Name <i class="fas fa-file-signature"></i></div>
                  <div className="header-container__head">Last Updated <i class="fas fa-clock"></i></div>
                  <div className="header-container__head">Created Date <i class="fas fa-calendar"></i> </div>
                </div>
                {selectedData && selectedData.directories.map((directory)=>(
                  <div className="wc-cc-fc-content__content-container">
                    <div className="content-container__data">{directory.name}</div>
                    <div className="content-container__data">{process_date(directory.date_age_last_updated)}</div>
                    <div className="content-container__data">{getDateOnlyFromString(directory.date_created)}</div>
                  </div>
                ))
             }


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
