import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import './QuizViewSinglePage.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck';
import defaultavatar from '../../images/defaultavatar.jpg'

const QuizViewSinglePage = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user?.id);
  const {quiz_id} = useParams();
  const single_deck_and_cards = useSelector(state=> state.quiz_deck.single_deck_with_cards?.quiz)
  // const single_deck_and_cards_errors= useSelector(state=> state.quiz_deck.single_deck_with_cards?.errors)

  const getQuizCardsArray = single_deck_and_cards?.quiz_card_relation;
  const getUserName = single_deck_and_cards?.username;
  const quiz_length = getQuizCardsArray?.length ? getQuizCardsArray.length - 1: 0

  const temp_categories = ['Datastructures', 'Algorithms', 'Python', 'Systems Design', 'Computer Science']
  const [count, setcount] = useState(0)

  useEffect(() => {
    dispatch(getSingleDeckWithCardsByIdThunk(quiz_id))

  }, [dispatch])

  // count logic for preview question
  const setcountE = (count_result) => {
    const total_cards = getQuizCardsArray.length - 1;
    if (count_result > total_cards) setcount(0)
    else if (count_result < 0) setcount(total_cards)
    else setcount(count_result);
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

      {/* deck metadata + preview questions grid*/}
      {single_deck_and_cards?.quiz_card_relation && <div className="qvspw__template-wrapper">
        <div className="qvspw__template-container">
          <div className="qvspw-tc__preview-questions">
            <div className="preview-questions__text">{single_deck_and_cards.quiz_card_relation[count]?.question}</div>
          </div>

          <div className="qvspw-tc__preview-sliders-container">
            <div className="preview-sliders-container__elements">
              <i onClick={()=>setcountE(count-1)} class="fas fa-arrow-left psc-e__left-arrow"></i>
              <div className="psc-e__count"> {count}/{quiz_length}</div>
              <i onClick={()=>setcountE(count+1)} class="fas fa-arrow-right psc-e__right-arrow"></i>
            </div>
          </div>

          {/* metadata */}
          <div className="qvspw-tc__template-data">
            <div className="template-data__description">
              <div className="td-d__description-title"> Description </div>
              <div  className="td-d__description-text-box">
                <div className="td-d-dtb__text-description"> It is a long established fact that a reader will be distracted by th 'Content here, content here', making English.</div>
              </div>
            </div>
            <div className="template-data__details">
              <div className="td-d__details-title"> Details </div>
              <div className="details-container">
                <div className="td-d__amount-answered"> you've answered: <span> 0/{quiz_length}</span> </div>
                <div className="td-d__current-state"> current status: <span> {single_deck_and_cards.is_private ? "private" : "public"}</span> </div>
                <div className="td-d__created-ago">created: <span>3 months</span> ago </div>
              </div>

            </div>
            <div className="template-data__utilities">
              <div className="td-u__utilities-title"> Extensions </div>
              <div className="td-u__utilities-container">
                <div className="td-u-uc__one"> Active Recall </div>
                <div className="td-u-uc__two"> Multiple Choice </div>
                {/* <div className="td-u-uc__three"> text </div> */}
              </div>

            </div>
            <div className="template-data__author">
              <div className="td-a__author-container" >
                <i className="fas fa-user-circle td-a-ac__profile-icon"></i>
                <div className="td-a-ac__created-by"> created by:  <span>{getUserName}</span> </div>
              </div>
            </div>
          </div>

          {/* settings and buttons */}
          <div className="">edit, settings(...), share, duplicate(+)</div>
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
