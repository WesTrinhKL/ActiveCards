import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Workspace.css'
import { getAllWorkspaceThunk, getAllUsersDecksDefaultDirectoryThunk } from '../../store/workspace_directories'
const Workspace = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state)=>state.session.user?.id)
  const allUserWorkspaces = useSelector((state)=>state.workspace_directories.all_workspace_and_children?.user_workspaces)
  const defaultDirectory = useSelector((state)=>state.workspace_directories.default_deck?.all_user_decks)

  useEffect(() => {
    if(currentUser){
      dispatch(getAllWorkspaceThunk())
      dispatch(getAllUsersDecksDefaultDirectoryThunk())
    }
  }, [dispatch])

  // console.log("example", defaultDirectory)

  // const [workspaceViewOn, setworkspaceViewOn] = useState(true)
  // const [workspaceSelectedName, setworkspaceSelectedName] = useState('default')
  const [directoriesViewOn, setdirectoriesViewOn] = useState(true)
  const [directoriesSelectedId, setdirectoriesSelectedId] = useState('default') //will be default, until a directory is clicked on, then set Id to that.


  const [directorySelectedData, setdirectorySelectedData] = useState('default')

  const selectDirectoryE = (directory_id)=> {
    setdirectoriesSelectedId(directory_id)
  }


  // if selected workspace: display, else if selected frontend: display, ...

  return (
    <>
      <div className="workspace-container">
        <div className="wc__directories-nav">
          {/* <div className="directories-nav__title">Navigation / Directories</div> */}
          <div className="directories-nav__workspace-directories">
            {/* default */}
            <div onClick={()=>setdirectoriesSelectedId('default')} className={directoriesSelectedId === 'default'?'workspace-directories__default workspace-selected':  'workspace-directories__default'}> default</div>

            {/* map workspace and directories*/}
            {allUserWorkspaces && (
              allUserWorkspaces.map((workspace)=>{
                return (
                  <>
                    <div className="workspace-nav">{workspace.name}</div>
                    {workspace.directories.map(directory=> <div onClick={()=>selectDirectoryE(directory.id)} className={directoriesSelectedId === directory.id?'directory-nav directory-selected':  'directory-nav'}>{directory.name}</div> )}
                  </>)
              })
            )}

          </div>

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
                  {directoriesViewOn && <div className="content__workspace-component"> {directoriesSelectedId} </div>}

                  <div className="content__directory-component"></div>
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
