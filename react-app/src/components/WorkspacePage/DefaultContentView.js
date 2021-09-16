import React, {useState, useEffect} from 'react'
import RepoDeckCover from './RepoDeckCover'

const DefaultContentView = ({default_decks}) => {
  const [deckSelected, setDeckSelected] = useState()
  console.log("default decks", default_decks)
  return (
    <>

      {
      <div>
        <div className="wc__content-container">
          <div className="wc-cc__header">
            <div className="cc-header__bread-crumbs"> /Draft </div>
          </div>
          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              <div onClick={()=>setDeckSelected('None')} className="wc-cc-fc-content__wrapper">
                {default_decks.map(deck=> <div onClick={()=>setDeckSelected(deck.id)} className="repo-deck-cover-container"><RepoDeckCover deck={deck}/></div>  )}

              </div>
            </div>
            <div className="wc-cc-fc__metadata">
              <div>metadata</div>
              <div>Add description</div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default DefaultContentView
