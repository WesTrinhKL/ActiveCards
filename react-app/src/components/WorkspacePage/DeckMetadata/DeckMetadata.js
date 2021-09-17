import React from 'react'
import DeckDeleteModal from '../../DeckDeleteModal'
import {process_date, reduceStringIfLongThan} from '../../utilities/util'
const DeckMetadata = ({deckSelected, delete_deck_handler, showDeleteModal, setshowDeleteModal}) => {
  return (
    <>
       {deckSelected && <div className="metadata__content-decks">
                <div className="decks__content-box">
                  <div className="basic-title">Title</div>
                  <div className="basic-answer">{deckSelected.title}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title">Visibility</div>
                  <div className="basic-answer"> {deckSelected.is_private ? 'Private': 'Public'}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title">Description</div>
                  <div className="basic-answer"> {deckSelected.description? reduceStringIfLongThan(deckSelected.description, 144, 144): ''}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title"># of cards</div>
                  <div className="basic-answer"> {deckSelected.number_of_cards}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title">Updated</div>
                  <div className="basic-answer"> {process_date(deckSelected.date_age_last_updated)}</div>
                </div>

                <div className="decks__content-box">
                  <div className="basic-title">Created</div>
                  <div className="basic-answer"> {process_date(deckSelected.date_age)}</div>
                </div>

                <div className="decks__content-box decks__meta-tool" >
                  <div onClick={()=> window.open(`/view/quizzes/${deckSelected.id}`, "_blank")} className="meta-tool__edit">
                    <i class="fas fa-external-link-alt"></i> <span>Open</span>
                  </div>
                  <div onClick={()=> window.open(`/edit/quizzes/${deckSelected.id}`, "_blank")} className="meta-tool__edit">
                    <i class="fas fa-edit"> </i> <span>Edit Deck</span>
                  </div>
                  <div onClick={()=>setshowDeleteModal(true)} className="meta-tool__delete">
                    <i class="fas fa-trash"></i>  <span>Delete Deck</span>
                  </div>

                  {showDeleteModal && <DeckDeleteModal delete_deck_handler={delete_deck_handler} setshowDeleteModal={setshowDeleteModal}/>}
                </div>
              </div>}
    </>
  )
}

export default DeckMetadata
