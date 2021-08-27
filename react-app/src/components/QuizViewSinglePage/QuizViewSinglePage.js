import React ,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './QuizViewSinglePage.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck'

const QuizViewSinglePage = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user?.id);
  const {quiz_id} = useParams();
  const single_deck_and_cards = useSelector(state=> state.quiz_deck.single_deck_with_cards?.quiz)
  const single_deck_and_cards_errors= useSelector(state=> state.quiz_deck.single_deck_with_cards?.errors)

  useEffect(() => {
    dispatch(getSingleDeckWithCardsByIdThunk(quiz_id))

  }, [dispatch])

  return (
    <div className="quiz-view-single-page-wrapper">
      <div className="qvspw__header-wrapper">
        <div className="qvspw-hw__title"> Software Interview Practice</div>
        <div className="qvspw-hw__author-by"> Made by: Wes Tr</div>
      </div>
      <div className="qvspw__template-wrapper">
        <div className="qvspw__template-container">
          <div className="qvspw-tc__preview-questions">Preview Questions</div>
          <div className="qvspw-tc__template-data">
            template metadata
            <div className="">Created By

            </div>
            <div className="">edit, settings(...), share, duplicate(+)</div>
          </div>


          {/* <div className="qvspw-tc__utilities">edit, settings(...), share, duplicate(+)</div> */}
        </div>
      </div>

      <div className="qvspw__cards-container">
        cards will be mapped here with QuizCardDetails component
      </div>
    </div>
  )
}

export default QuizViewSinglePage
