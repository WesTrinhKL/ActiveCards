import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Workspace.css'
import { getAllWorkspaceThunk, getAllUsersDecksDefaultDirectoryThunk } from '../../store/workspace_directories'
import DirectoryContentView from './DirectoryContentView'
import WorkspaceContentView from './WorkspaceContentView'
import DefaultContentView from './DefaultContentView'
import CreateWorkspaceModal from './CreateWorkspaceModal/CreateWorkspaceModal'
const Workspace = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state)=>state.session.user?.id)

  const allUserWorkspaces = useSelector((state)=>state.workspace_directories.all_workspace_and_children?.user_workspaces)

  const defaultDirectoryDecks = useSelector((state)=>state.workspace_directories.default_deck?.all_user_decks)


  useEffect(() => {
    if(currentUser){
      dispatch(getAllWorkspaceThunk())
      dispatch(getAllUsersDecksDefaultDirectoryThunk())
    }
  }, [dispatch])


  const [directoriesViewOn, setdirectoriesViewOn] = useState(true)
  const [dirOrWorkspaceSelectedId, setdirOrWorkspaceSelectedId] = useState('default')
  const [dirTitle, setDirTitle] = useState('')
  const [selectedData, setselectedData] = useState(null)


  const [showCreateWorkspace, setshowCreateWorkspace] = useState(false)

  const selectDefaultE = (directory_id)=> {
    setdirOrWorkspaceSelectedId(directory_id)
    setdirectoriesViewOn(true)
  }

  const selectDirectoryE = (directory_id, decks, title)=> {
    setdirOrWorkspaceSelectedId(directory_id)
    setselectedData(decks)
    setDirTitle(title)
    setdirectoriesViewOn(true)
  }
  const selectWorkspaceE = (workspace_id, workspace_data)=> {
    setdirOrWorkspaceSelectedId(workspace_id)
    setselectedData(workspace_data)
    setdirectoriesViewOn(false)
  }

  const closeModalHandler =()=>{
    setshowCreateWorkspace(false)
  }

  // console.log("default", defaultDirectoryDecks)
  // console.log("directory", selectedData)
  // console.log("all", allUserWorkspaces)

  return (
    <>
      <div className="workspace-container">
        <div className="wc__directories-nav">
          {/* <div className="directories-nav__title">Navigation / Directories</div> */}
          <div className="directories-nav__workspace-directories">
            {/* default */}
            {defaultDirectoryDecks && <div onClick={()=>selectDefaultE('default')} className={dirOrWorkspaceSelectedId === 'default'?'workspace-directories__default workspace-selected':  'workspace-directories__default'}> Draft</div>}

            {/* map workspace and directories*/}
            {allUserWorkspaces && (
              allUserWorkspaces.map((workspace)=>{
                return (
                  <>
                    {/* selecting workspace */}
                    <div onClick={()=>selectWorkspaceE(workspace.id, workspace)} className={dirOrWorkspaceSelectedId === workspace.id && !directoriesViewOn?'workspace-nav workspace-selected': 'workspace-nav'} >{workspace.name}</div>

                    {/* selecting directories */}
                    {workspace.directories.map(directory=> <div onClick={()=>selectDirectoryE(directory.id, directory.decks, directory.name)} className={dirOrWorkspaceSelectedId === directory.id && directoriesViewOn?'directory-nav directory-selected':  'directory-nav'}>{directory.name}</div> )}
                  </>)
              })
            )}
          </div>

          <div onClick={()=>setshowCreateWorkspace(true)} className="workspace-directories__create vanilla-button-1">create workspace</div>
          {showCreateWorkspace && <CreateWorkspaceModal closeModalHandler={closeModalHandler}/>}


        </div>

        {defaultDirectoryDecks && dirOrWorkspaceSelectedId === 'default' && <div className="content__directory-component">
          <DefaultContentView default_decks={defaultDirectoryDecks}/>
        </div>}

        {directoriesViewOn && dirOrWorkspaceSelectedId !== 'default' && selectedData && <div className="content__directory-component">
          <DirectoryContentView directory_decks={selectedData} dir_title={dirTitle} dir_id={dirOrWorkspaceSelectedId}/>
        </div>}

        {!directoriesViewOn && dirOrWorkspaceSelectedId !== 'default' && <div className="content__workspace-component">
          <WorkspaceContentView selectedData={selectedData} workspace_id={dirOrWorkspaceSelectedId}/>
        </div>}

      </div>

    </>
  )
}

export default Workspace
