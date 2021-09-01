import React, {useState} from 'react'
import './QuizCardDetails.css'
import ViewPreviousModal from '../ViewPreviousModal'
import { setNewActiveRecallAnswer } from '../../store/quiz_deck'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const QuizCardDetails = ({singleCardData, editMode=false}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [tab, setTab] = useState('active-recall')
  const [editModeSingleState, seteditModeSingleState] = useState(editMode)
  // state for allowAnswer (if active recall answered, allow answer)

  // single data properties: card_number, id, question, quiz_template_relation, title, user_relation
  // console.log('single data', singleCardData)

  const [question, setquestion] = useState(singleCardData.question);
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState([]);

  //---- strictly edit ----
  // includes 'question'
  const [correctAnswer, setCorrectAnswer] = useState(singleCardData.active_recall_utility_answer?.correct_answer);


  const setAnswerE = (e) => {
    setAnswer(e.target.value);
    // console.log("myanswer", answer);
  }

  const onSaveAnswer = ()=>{
    const payload = {
      user_active_answer:answer,
      active_recall_utility_id: singleCardData.active_recall_utility_answer.active_recall_id,
      quiz_card_id: singleCardData.id
      // quiz_directory_id: user_first_directory_id,
      // user_id,
      // id: current_deck_id

    }
    setErrors([]);
    dispatch(setNewActiveRecallAnswer(payload)).then( (data)=>{
      if(data && data.id){
        console.log("time to reload", data)
        // history.push(`/view/quizzes/${data.id}`);
        // window.location.reload();
        alert("Saved Answer Successfully");
        history.push('/temp');
        history.goBack();
        // window.location.reload();
      }
    }).catch(async (res) =>{
      console.log("error hit")
      const data = res
      if(data && data.errors) setErrors(data.errors);
    })
  }

  return (
    <>
      {!editModeSingleState && singleCardData &&
      <div className="single-card-container">
        {/* logic for tabs: button changes state 'tab' and based on tab, render that one */}
        <div className="scs__buttons-container">
          {/* for each tab, add dynamic button and setTab to a property 'name-of-tab' */}
          <div className={`${tab==='active-recall'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('active-recall')}>Active Recall</div>

          {/* answer tab will always be here */}
          <div className={`${tab==='answers'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('answers')}>Answers</div>
          {/* if state of active recall not answered, do not display answers */}
        </div>

        <div className="scs__content-container">
          <div className="scs-cc__question"> <span>Question: </span> {question}</div>
          {/* remember that each tab will have its own extensions. */}
          {tab==='active-recall' && <div className="scs-cc__active-recall-container" >
            {/* in each tab, we'll have a button to add extension. Once clicked, you can select an extension from the collapsible on the right. Adding an extension will then add the component for that extension in the list that will be mapped. for each extension in extensions, render template and pass in extension data (or make individual extension components*/}
            {/* active-recall content */}
            <div className="scs-cc-arc__text-area-title"> Enter Answer Here:</div>
            <textarea value={answer} onChange={(e)=>setAnswerE(e)} className="scs-cc-arc__text-area-content"></textarea>
            <div className="scs-cc-arc__save-prev-container">
              <div className="scs-cc-arc__previous-answers"> <ViewPreviousModal previousAnswers={singleCardData.current_user_answers}/> </div>
              <div onClick={onSaveAnswer} className="scs-cc-arc__save-answer"> save answer</div>
            </div>
          </div>}


          {tab==='answers' && <div className="scs-cc__active-answers-container">
            {/* each extension will have an optional answer property that the user can add. If not added, then don't render */}
            {/* for each extension, display answer_component wrapped over answer */}
            <div className="scs-cc-ac__author-title"> Author's Answer:</div>
            <div className="scs-cc-ac__author-answer">{singleCardData.active_recall_utility_answer?.correct_answer}</div>
            <div className="scs-cc-ac__icons-view">
              <div className="scs-cc-ac-iv__view-others"> VIEW OTHERS</div>
              {/* <div className="scs-cc-ac-iv__icons-container"> <i className="fas fa-thumbs-up thumbs-up-card-answer"></i></div> */}
            </div>
          </div>}

        </div>
      </div>}

      {/*------------------------ EDIT MODE COMPONENT ------------------------*/}
      {editModeSingleState && singleCardData &&
      <div className="single-card-container edit-single-card-container">

        <div className="scs__buttons-container">
          <div className={`${tab==='question'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('question')}>Question</div>
          <div className={`${tab==='active-recall'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('active-recall')}>Active Recall</div>
        </div>



        <div className="scs__content-container">

          {tab==='question' && <div className="scs-cc__active-recall-container" >
            <ul className="error-group">
                {errors.map((error, idx) => <li key={idx}>*{error}</li>)}
            </ul>
            <div className="edit-question"> <span>Question: </span></div>
            {/* <div className="scs-cc-arc__text-area-title"> Update Question Here:</div> */}
            <textarea value={question} onChange={(e)=>setAnswerE(e)} className="scs-cc-arc__text-area-content"></textarea>
            <div className="scs-cc-arc__save-prev-container">
              <div onClick={onSaveAnswer} className="scs-cc-arc__save-answer edit-update-save-button"> update question</div>
            </div>
          </div>}


          {/* these should be their own components later */}
          {tab==='active-recall' && <div className="scs-cc__active-recall-container edit-active-recall-container" >
            <ul className="error-group">
                {errors.map((error, idx) => <li key={idx}>*{error}</li>)}
            </ul>
            <div className="edit-correct-answer-title"> Current Answer:</div>
            <textarea value={correctAnswer} onChange={(e)=>setAnswerE(e)} className="recall-correct-answer-textarea"></textarea>
            <div className="scs-cc-arc__save-prev-container">
              <div onClick={onSaveAnswer} className="scs-cc-arc__save-answer edit-update-save-button"> update answer</div>
            </div>
          </div>}

        </div>
      </div>
        // each component will have its own location for errors
        // --------tab to edit question
        // --------tab to edit active recall (answer)
        // update button for each tab.
        // each utility will only have 1 tab (active recall 1 tab where they can update question)

      }
    </>
  )
}

export default QuizCardDetails
