import React from 'react'
import { useHistory } from 'react-router-dom'
import './DeckCoverCard.css'
import { process_date, reduceStringIfLongThan } from '../utilities/util';
import { useSelector } from 'react-redux';

const DeckCoverCard = ({deckCover}) => {
  const user_id = useSelector((state) => state.session.user?.id);
  const history = useHistory();

  const send_to_view_deck = ()=>{
    if(user_id) history.push(`/view/quizzes/${deckCover.id}`)
    else{
      history.push(`/sign-up`)
    }
  }

  return (
    <div onClick={send_to_view_deck} className="deck-cover-card-wrapper">
      <div className="vanilla-card-cover-container-1 deck-card-container-size">
        <div className="deck-cover-title-container">
          <div className="dctc__title">
            {reduceStringIfLongThan(deckCover.title)}
          </div>

        </div>
        <div className="deck-cover-metadata-container">
          <div className="dcmc__metadata-content">
            <div className="metadata-content__all"> # of cards: <span>{deckCover.number_of_cards}</span> </div>
            <div className="metadata-content__all">created: <span>{process_date(deckCover.date_age)}</span> </div>
            <div className="metadata-content__all">visibility: <span>{deckCover.is_private? 'Private': 'Public'}</span> </div>
            <div className="metadata-content__all">description: <span id="description-font">{reduceStringIfLongThan(deckCover.description,40,40)}</span></div>
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
