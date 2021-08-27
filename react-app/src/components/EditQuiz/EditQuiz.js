import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck'
import { useDispatch, useSelector } from 'react-redux';


const EditQuiz = () => {
  const dispatch = useDispatch();
  const {quiz_id} = useParams();
  const single_deck_and_cards = useSelector(state=> state.quiz_deck.single_deck_with_cards?.quiz)
  const single_deck_and_cards_errors= useSelector(state=> state.quiz_deck.single_deck_with_cards?.errors)

  useEffect(() => {
    dispatch(getSingleDeckWithCardsByIdThunk(quiz_id))

  }, [dispatch])

  // verify that the user_id is the same as the one from the deck being requested in the url, otherwise 404
  // try to dispatch for the template / deck id, if error return 404 error
  // figure out a way to close modal using global context and save quiz_deck state

  return (
    <>
      {
        single_deck_and_cards_errors && <div>
          404 error, sorry unavailable
        </div>
      }
      {single_deck_and_cards && <div>
        <div>
          Edit Quiz Page for id: {quiz_id}
        </div>
        <div>
          Quiz Title: {single_deck_and_cards.title}
        </div>
        <div>
          Current Visibility: {single_deck_and_cards.is_private? 'private': 'public'}
        </div>
        <div>
          Description: {single_deck_and_cards.description? single_deck_and_cards.description: "None"}
        </div>
        <div>

        </div>
      </div>}
    </>
  )
}

export default EditQuiz
