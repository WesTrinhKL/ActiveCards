import React, {useState, useEffect} from 'react'
import RepoDeckCover from './RepoDeckCover'

const DefaultContentView = ({default_decks}) => {
  const [deckSelected, setDeckSelected] = useState("")

  console.log("deckSelected", deckSelected)
  return (
    <>

      {
      <div>
        <div className="wc__content-container">
          <div className="wc-cc__header">
            <div className="cc-header__bread-crumbs"> <i class="fas fa-home"></i> / Draft </div>
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
              <div></div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default DefaultContentView
