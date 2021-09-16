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

  const [directoriesViewOn, setdirectoriesViewOn] = useState(true)
  const [dirOrWorkspaceSelectedId, setdirOrWorkspaceSelectedId] = useState('default') //will be default, until a directory is clicked on, then set Id to that.


  const [navSelectedData, setnavSelectedData] = useState('default')

  const selectDirectoryE = (directory_id)=> {
    setdirOrWorkspaceSelectedId(directory_id)
    setdirectoriesViewOn(true)
  }
  const selectWorkspaceE = (workspace_id)=> {
    setdirOrWorkspaceSelectedId(workspace_id)
    setdirectoriesViewOn(false)
  }

  // if selected workspace: display, else if selected frontend: display, ...

  return (
    <>
      <div className="workspace-container">
        <div className="wc__directories-nav">
          {/* <div className="directories-nav__title">Navigation / Directories</div> */}
          <div className="directories-nav__workspace-directories">
            {/* default */}
            {defaultDirectory && <div onClick={()=>setdirOrWorkspaceSelectedId('default')} className={dirOrWorkspaceSelectedId === 'default'?'workspace-directories__default workspace-selected':  'workspace-directories__default'}> Draft</div>}

            {/* map workspace and directories*/}
            {allUserWorkspaces && (
              allUserWorkspaces.map((workspace)=>{
                return (
                  <>
                    {/* selecting workspace */}
                    <div onClick={()=>selectWorkspaceE(workspace.id)} className={dirOrWorkspaceSelectedId === workspace.id && !directoriesViewOn?'workspace-nav workspace-selected': 'workspace-nav'} >{workspace.name}</div>

                    {/* selecting directories */}
                    {workspace.directories.map(directory=> <div onClick={()=>selectDirectoryE(directory.id)} className={dirOrWorkspaceSelectedId === directory.id && directoriesViewOn?'directory-nav directory-selected':  'directory-nav'}>{directory.name}</div> )}
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

                  {directoriesViewOn && <div className="content__directory-component"> viewing directories: {dirOrWorkspaceSelectedId} </div>}
                  {/* if directory is 'default' pass prop of the default data instead of dir id */}

                  {!directoriesViewOn && <div className="content__workspace-component"> viewing workspace: {dirOrWorkspaceSelectedId} </div>}

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
