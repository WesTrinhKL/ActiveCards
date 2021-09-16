import React, {useState, useEffect} from 'react'
import RepoDeckCover from './RepoDeckCover'
import { reduceStringIfLongThan, process_date } from '../utilities/util'
const DefaultContentView = ({default_decks}) => {
  const [deckSelected, setDeckSelected] = useState("")

  console.log("deckSelected", deckSelected)
  return (
    <>

      {
      <div>
        <div className="wc__content-container">
          <div className="wc-cc__header">
            <div className="cc-header__bread-crumbs"> <i class="fas fa-home"></i> / Draft / <span> {deckSelected? reduceStringIfLongThan(deckSelected.title, 20, 20): ''} </span> </div>
          </div>
          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              <div className="wc-cc-fc-content__wrapper-default">
                {/* <div>Draft</div> */}

                <div className="default-repo-wrapper">
                  {default_decks.map(deck=> <div onClick={()=>setDeckSelected(deck)} ><RepoDeckCover selected={deckSelected?.id && deckSelected.id === deck.id? true: false  } deck={deck}/></div>  )}
                </div>


              </div>
            </div>
            {/* if deck selected show metadata about deck, else show metadata about draft workspace */}
            <div className="wc-cc-fc__metadata">
              <div></div>
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
                  <div className="basic-answer"> {reduceStringIfLongThan(deckSelected.description, 144, 144)}</div>
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

                  <div onClick={()=> window.open(`/edit/quizzes/${deckSelected.id}`, "_blank")} className="meta-tool__edit">
                    <i class="fas fa-edit"> </i> <span>Edit Deck</span>
                  </div>
                  <div className="meta-tool__delete">
                    <i class="fas fa-trash"></i>  <span>Delete Deck</span>
                  </div>


                </div>





              </div>}


            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default DefaultContentView
