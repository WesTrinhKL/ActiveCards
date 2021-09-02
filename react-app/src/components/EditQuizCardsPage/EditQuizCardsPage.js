import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck'
import { useDispatch, useSelector } from 'react-redux';
import QuizCardsView from '../QuizViewSinglePage/QuizCardsView';
import { useHistory } from 'react-router-dom';
import './EditQuizCardsPage.css';
import { handleScrollTopUtil } from '../utilities/util';


const EditQuizCardsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user_id = useSelector((state) => state.session.user?.id);
  const single_deck_and_cards = useSelector(state=> state.quiz_deck.single_deck_with_cards?.quiz)
  const single_deck_and_cards_errors= useSelector(state=> state.quiz_deck.single_deck_with_cards?.errors)

  const {quiz_id} = useParams();
  const getQuizCardsArray = single_deck_and_cards?.quiz_card_relation;
  const getUserName = single_deck_and_cards?.username;
  const quiz_length = getQuizCardsArray?.length ? getQuizCardsArray.length: 0;
  const belongs_to_user = user_id === single_deck_and_cards?.user_id;

  useEffect(() => {
    dispatch(getSingleDeckWithCardsByIdThunk(quiz_id))
  }, [dispatch])


  const go_back_to_set = ()=>{
    history.push(`/view/quizzes/${quiz_id}`);
  }

  // verify that the user_id is the same as the one from the deck being requested in the url, otherwise 404
  if(!belongs_to_user){
    return (<div>
      404 error, sorry unavailable
    </div>)
  }

  // try to dispatch for the template / deck id, if error return 404 error
  // figure out a way to close modal using global context and save quiz_deck state


  return (
    <div className="edit-cards-wrapper">

      {single_deck_and_cards && belongs_to_user &&
      <div className="ecw__page">
        {/* ---header--- */}
        <div className="ecw-p__header-container">
          <div className="header-container__utilities">
            <div onClick={go_back_to_set} className="vanilla-button-1">
              {/* go back / return to previous */}
              <i className="fas fa-chevron-left return-icon"></i> Go to View
            </div>
          </div>
          <div className="header-container__title">
            Currently Editing: <span> {single_deck_and_cards.title} </span>
          </div>
          <div className="header-container__sub-title">
            Current Visibility: <span>{single_deck_and_cards.is_private? 'private': 'public'} </span>
          </div>
        </div>


        {/* ---content--- */}
        <div className="edit-page-cards-view-container">
          <QuizCardsView allQuizCardsDataArray={getQuizCardsArray} quizDeckMetadata={single_deck_and_cards} editMode={true} />
        </div>
      </div>}

      {/* quiz card view, for plural, get all cards, map each card to the quizcard component */}



    </div>
  )
}

export default EditQuizCardsPage
