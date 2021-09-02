import React ,{useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './DeckCoverCard.css'
import { process_date, reduceStringAttachDots, reduceStringIfLongThan } from '../utilities/util';

import Error404Page from '../Error404Page/Error404Page';

// fetch by most recent, public only


const DeckCoverCard = ({deckCover}) => {
  return (
    <div className="deck-cover-card-wrapper">
      <div className="vanilla-card-cover-container-1 deck-card-container-size">
        <div className="deck-cover-title-container">
          <div className="dctc__title">
            {reduceStringIfLongThan(deckCover.title)}
          </div>

        </div>
        <div className="deck-cover-metadata-container">
          <div className="dcmc__metadata-content">
            <div> # of cards: <span>{deckCover.number_of_cards}</span> </div>
            <div>created: <span>{process_date(deckCover.date_age)}</span> </div>
            <div>description: <span>{reduceStringIfLongThan(deckCover.description,40,40)}</span></div>
          </div>
        </div>
        <div className="deck-cover-author-container">
          <i className="fas fa-user-circle dcac__profile-icon"></i>
          <div className="dcac__created-by"> created by:  <span>{deckCover.username}</span> </div>
        </div>
      </div>
    </div>
  )
}

export default DeckCoverCard
