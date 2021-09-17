import React, {useState} from 'react'
import {process_date, reduceStringIfLongThan} from '../../utilities/util'
import CreateWorkspaceModal from '../CreateWorkspaceModal/CreateWorkspaceModal'
const WorkspaceMetadata = ({workspace_data}) => {
  const [showCreateDir, setshowCreateDir] = useState(false)
  return (
    <>
       {workspace_data && <div className="metadata__content-decks">
                <div className="decks__content-box">
                  <div className="basic-title">Title</div>
                  <div className="basic-answer">{workspace_data.name}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title">Description</div>
                  <div className="basic-answer"> {workspace_data.description? reduceStringIfLongThan(workspace_data.description, 144, 144): ''}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title"># of directories</div>
                  <div className="basic-answer"> {workspace_data.directories.length}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title">Updated</div>
                  <div className="basic-answer"> {process_date(workspace_data.date_age_last_updated)}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title">Created</div>
                  <div className="basic-answer"> {process_date(workspace_data.date_age)}</div>
                </div>

                <div className="decks__content-box decks__meta-tool" >
                  <div onClick={()=>setshowCreateDir(true)} className="meta-tool__edit">
                    <i class="fas fa-plus"></i> <span>add directory</span>
                  </div>
                  {showCreateDir && <CreateWorkspaceModal closeModalHandler={setshowCreateDir} createDir={true} workspace_id={workspace_data.id}/>}

                </div>
              </div>}
    </>
  )
}

export default WorkspaceMetadata
