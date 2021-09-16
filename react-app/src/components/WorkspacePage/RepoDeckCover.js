import React, {useState} from 'react'
import { reduceStringIfLongThan } from '../utilities/util'

const RepoDeckCover = ({deck, selected}) => {

  // const [selectedDeck, setselectedDeck] = useState('')
  console.log("deck selected: ", selected)
  return (
    <div className="repo-deck-cover-container">

      <div></div>
      <div className="deck-cover__middle">
        <div className="middle__box"></div>
        <div className="middle__deck-description"> {reduceStringIfLongThan(deck.description, 20, 20)} </div>
        <div className="middle__box"></div>
        <div className="middle__box"></div>
      </div>

      <div className={selected ? "deck-cover__bottom dc-bottom--selected": "deck-cover__bottom"}>
        <div className="dc-bottom__text">
          <div> {reduceStringIfLongThan(deck.title, 20, 20)} </div>
        </div>
        <div className="dc-bottom__settings"><i class="fas fa-ellipsis-v"></i></div>
      </div>
    </div>
  )
}

export default RepoDeckCover
