import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Workspace.css'
import { getAllWorkspaceThunk, getAllUsersDecksDefaultDirectoryThunk } from '../../store/workspace_directories'
const Workspace = () => {
  // use single fetch call to:
    // get all users workspace
    // get all users directory for each workspace
    // get all deck cover templates for each workspace

  const currentUser = useSelector((state)=>state.session.user?.id)
  // const allWorkspace = useSelector((state)=>)
  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser){
      dispatch(getAllWorkspaceThunk())
      dispatch(getAllUsersDecksDefaultDirectoryThunk())
    }

  }, [dispatch])

  console.log("example of workspace")

  const [workspaceViewOn, setworkspaceViewOn] = useState(true)
  const [workspaceSelectedName, setworkspaceSelectedName] = useState('default')



  return (
    <>
      <div className="workspace-container">
        <div className="wc__directories-nav">
          Navigation / Directories
          {/* onClick, set directoryView true and setDirectory to selected  */}
          {/* {workspaceAndDirectories.map(workspace => )} */}
          <div>
          </div>

        </div>


        <div className="wc__content-container">
          {/* Content Container changes depending on selected */}
          <div className="wc-cc__header">
            <div className="cc-header__bread-crumbs">content header / breadcrumbs...</div>
          </div>
          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              <div className="wc-cc-fc-content__wrapper">
                <div className="content_wrapper__header">
                  {workspaceViewOn && <div className="content__workspace-component"> {workspaceSelectedName} </div>}

                  <div className="content__directory-component"> directory </div>
                </div>
              </div>
            </div>
            <div className="wc-cc-fc__metadata">
              metadata
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Workspace
