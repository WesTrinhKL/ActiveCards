import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import './QuizViewSinglePage.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck'

const QuizViewSinglePage = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user?.id);
  const {quiz_id} = useParams();
  const single_deck_and_cards = useSelector(state=> state.quiz_deck.single_deck_with_cards?.quiz)
  // const single_deck_and_cards_errors= useSelector(state=> state.quiz_deck.single_deck_with_cards?.errors)

  const getQuizCardsArray = single_deck_and_cards?.quiz_card_relation;

  const temp_categories = ['Datastructures', 'Algorithms', 'Python', 'Systems Design', 'Computer Science']
  const [count, setcount] = useState(0)

  useEffect(() => {
    dispatch(getSingleDeckWithCardsByIdThunk(quiz_id))

  }, [dispatch])

  const setcountE = (count_result) => {
    const total_cards = getQuizCardsArray.length - 1;
    console.log("total cards", typeof total_cards)
    console.log("total count", typeof count_result)
    if (count_result > total_cards) setcount(total_cards)

    else if (count_result < 0) setcount(0)

    else{
      setcount(count_result);
    }


  }

  return (
    <div className="quiz-view-single-page-wrapper">


      {/* template header */}
      <div className="qvspw__header-wrapper">
        <div className="qvspw-hw__title"> Software Interview Practice</div>
        <div className="qvspw-hw__categories-wrapper" >
          {temp_categories.map(category => (
              <div className="qvspw-hw__categeories"> <span>{category}</span> </div>
          ))}
        </div>
      </div>

      {/* deck metadata + preview questions*/}
      {single_deck_and_cards?.quiz_card_relation && <div className="qvspw__template-wrapper">
        <div className="qvspw__template-container">
          <div className="qvspw-tc__preview-questions">
            <div className="preview-questions__text">{single_deck_and_cards.quiz_card_relation[count]?.question}</div>
          </div>
          <div className="qvspw-tc__template-data">
            template metadata
            <div className="">Created By
            </div>
            <div className="">edit, settings(...), share, duplicate(+)</div>
          </div>
          <div className="qvspw-tc__preview-sliders-container">
            <div className="preview-sliders-container__elements">
              <i onClick={()=>setcountE(count-1)} class="fas fa-arrow-left psc-e__left-arrow"></i>
              <div className="psc-e__count"> {count}/{getQuizCardsArray.length - 1}</div>
              <i onClick={()=>setcountE(count+1)} class="fas fa-arrow-right psc-e__right-arrow"></i>
            </div>
          </div>
          {/* <div className="qvspw-tc__utilities">edit, settings(...), share, duplicate(+)</div> */}
        </div>
      </div>}

      {/* cards container */}
      <div className="qvspw__cards-container">
        cards will be mapped here with QuizCardDetails component
      </div>
    </div>
  )
}

export default QuizViewSinglePage
