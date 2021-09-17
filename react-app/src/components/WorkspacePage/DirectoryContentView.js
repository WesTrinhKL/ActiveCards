import React, {useState, useEffect} from 'react'
import { reduceStringIfLongThan } from '../utilities/util'
import { deleteFormQuizDeckTempThunk } from '../../store/quiz_deck'
import { getAllWorkspaceThunk, getAllUsersDecksDefaultDirectoryThunk } from '../../store/workspace_directories'
import { useDispatch } from 'react-redux'
import DeckMetadata from './DeckMetadata/DeckMetadata'
import RepoDeckCover from './RepoDeckCover'

const DirectoryContentView = ({directory_decks, dir_title}) => {
  const dispatch = useDispatch();
  const [deckSelected, setDeckSelected] = useState("")
  const [showDeleteModal, setshowDeleteModal] = useState(false)

  useEffect(() => {
    setDeckSelected("")
  }, [directory_decks])


  const delete_deck_handler = async ()=>{
    const data = await dispatch(deleteFormQuizDeckTempThunk(deckSelected.id));
      setDeckSelected("")
      setshowDeleteModal(false)
      alert("deleted successfully!");
      dispatch(getAllWorkspaceThunk())
  }
  console.log("directory_decks", directory_decks)



  return (
    <>
      {directory_decks &&
      <div>
        <div className="wc__content-container">
          <div className="wc-cc__header">
            <div className="cc-header__bread-crumbs"> <i class="fas fa-home"></i> / {dir_title} / <span> {deckSelected? reduceStringIfLongThan(deckSelected.title, 20, 20): ''} </span> </div>
          </div>
          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              <div className="wc-cc-fc-content__wrapper">
                {/* <div>Draft</div> */}

                <div className="default-repo-wrapper">
                  {directory_decks.map(deck=> <div onClick={()=>setDeckSelected(deck)} onDoubleClick={()=> window.open(`/view/quizzes/${deckSelected.id}`, "_blank")}><RepoDeckCover selected={deckSelected?.id && deckSelected.id === deck.id? true: false  } deck={deck}/></div>  )}
                </div>


              </div>
            </div>
            {/* if deck selected show metadata about deck, else show metadata about draft workspace */}
            <div className="wc-cc-fc__metadata">
              <div></div>

              <DeckMetadata deckSelected={deckSelected} delete_deck_handler={delete_deck_handler} showDeleteModal={showDeleteModal} setshowDeleteModal={setshowDeleteModal}/>

            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default DirectoryContentView
