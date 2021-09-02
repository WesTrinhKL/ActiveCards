import React ,{useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './DeckCoverCard.css'

import Error404Page from '../Error404Page/Error404Page';

const reduceStringAttachDots = (amount_want, string_to_reduce) =>{
  return string_to_reduce.slice(0,amount_want) + '...'
}

const DeckCoverCard = ({deckCover}) => {
  return (
    <div className="deck-cover-card-wrapper">
      <div className="vanilla-card-cover-container-1 deck-card-container-size">
        <div className="deck-cover-title-container">
          {deckCover.title}
        </div>
        <div className="deck-cover-metadata-container">
          blue metadata
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
