import React, {useState, useEffect} from 'react'
import RepoDeckCover from './RepoDeckCover'
import { reduceStringIfLongThan } from '../utilities/util'

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
                  <div>Title</div>
                  <div>{deckSelected.title}</div>
                </div>

                <div className="decks__content-box">
                  <div>Visibility</div>
                  <div> {deckSelected.is_private ? 'Private': 'Public'}</div>
                </div>

                <div className="decks__content-box">
                  <div>Description</div>
                  <div> {reduceStringIfLongThan(deckSelected.description, 144, 144)}</div>
                </div>

                <div className="decks__content-box">
                  <div># of cards</div>
                  <div> {deckSelected.number_of_cards}</div>
                </div>

                <div className="decks__content-box">
                  <div>Updated</div>
                  <div> {'24 hours ago'}</div>
                </div>

                <div className="decks__content-box">
                  <div>Created</div>
                  <div> {'14 days ago'}</div>
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
