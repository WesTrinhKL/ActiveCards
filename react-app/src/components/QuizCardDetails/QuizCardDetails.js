import React, {useState} from 'react'
import './QuizCardDetails.css'
import ViewPreviousModal from '../ViewPreviousModal'
import { setNewActiveRecallAnswer } from '../../store/quiz_deck'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createQuizCardThunk } from '../../store/quiz_card';
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck';

const QuizCardDetails = ({singleCardData, editMode=false, quizMetadata, addMode=false}) => {
  // console.log("metadata for quiz deck", quizMetadata)
  // console.log("add mode true?", addMode)
  // console.log("metadata for quiz deck", singleCardData)

  const user_id = useSelector((state) => state.session.user?.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const [tab, setTab] = useState('active-recall')
  const [editModeSingleState, seteditModeSingleState] = useState(editMode)
  const [addModeSingleState, setaddModeSingleState] = useState(addMode)
  // state for allowAnswer (if active recall answered, allow answer)

  // single data properties: card_number, id, question, quiz_template_relation, title, user_relation
  // console.log('single data', singleCardData)

  const [question, setquestion] = useState(singleCardData?.question || '' );
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState([]);

  //---- strictly edit ----
  // includes 'question'
  const [correctAnswer, setCorrectAnswer] = useState(singleCardData?.active_recall_utility_answer?.correct_answer || '');

  //---- for adding question----
  const [addTab, addSetTab] = useState('question')

  const setAnswerE = (e) => setAnswer(e.target.value);
  const setCorrectAnswerE = (e) => setCorrectAnswer(e.target.value);
  const setquestionE = (e) => setquestion(e.target.value);

  const add_new_item = ()=>{
    // attempt to add new item, then dispatch the card_template get thunk to grab everything so the main components at the top will re-render
    // if there's a bunch of utility to be added, then it's better to chain multiple REST API requests than sending all the data in the future.
    // payloads would also be passed as a variable
    const payload1 = {
      title:quizMetadata?.title,
      card_number: (quizMetadata?.quiz_card_relation).length +1 || 1,
      question: question,
      quiz_template_id: quizMetadata?.id,
      user_id,
      correct_answer: correctAnswer,
    }
    console.log('payload data', payload1)

    setErrors([]);
    dispatch(createQuizCardThunk(payload1)).then( (data)=>{
      if(data && !data.errors){
        dispatch(getSingleDeckWithCardsByIdThunk(quizMetadata?.id))
        // change this to message banner later
        alert("created card Answer Successfully");
        setaddModeSingleState(false); //hides this component
      }
      else if(data && data.errors){
        setErrors(data.errors);
      }
      else{
        setErrors(['something went wrong, please try again.'])
      }
    }).catch(async (res) =>{
      console.log("error hit")
      const data = res
      if(data && data.errors) setErrors(data.errors);
    })
  }


  const onSaveAnswer = ()=>{
    const payload = {
      user_active_answer:answer,
      active_recall_utility_id: singleCardData.active_recall_utility_answer.active_recall_id,
      quiz_card_id: singleCardData.id
    }
    setErrors([]);
    dispatch(setNewActiveRecallAnswer(payload)).then( (data)=>{
      if(data && data.id){
        console.log("time to reload", data)
        alert("Saved Answer Successfully");
        history.push('/temp');
        history.goBack();
         // history.push(`/view/quizzes/${data.id}`);
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
      {/*------------------------ VIEW MODE COMPONENT ------------------------*/}
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
          <div className="error-group-container">
            <ul className="error-group">
                {errors.map((error, idx) => <li className="error-text" key={idx}>*{error}</li>)}
            </ul>
          </div>

          {/* questions tab */}
          {tab==='question' && <div className="scs-cc__active-recall-container" >
            <ul className="error-group">
                {errors.map((error, idx) => <li key={idx}>*{error}</li>)}
            </ul>
            <div className="edit-question"> <span>Question: </span></div>
            {/* <div className="scs-cc-arc__text-area-title"> Update Question Here:</div> */}
            <textarea value={question} onChange={(e)=>setquestionE(e)} className="scs-cc-arc__text-area-content"></textarea>
          </div>}


          {/* these should be their own components later */}
          {tab==='active-recall' && <div className="scs-cc__active-recall-container" >
            <ul className="error-group">
                {errors.map((error, idx) => <li key={idx}>*{error}</li>)}
            </ul>
            <div className="edit-correct-answer-title"> Author's (your) Answer:</div>
            <textarea value={correctAnswer} onChange={(e)=>setCorrectAnswer(e)} className="recall-correct-answer-textarea"></textarea>

          </div>}

        </div>
        <div className="scs-cc-arc__save-prev-container">
            <div onClick={onSaveAnswer} className="scs-cc-arc__save-answer edit-update-save-button"> update the card</div>
          </div>
      </div>
        // each component will have its own location for errors
        // --------tab to edit question
        // --------tab to edit active recall (answer)
        // update button for each tab.
        // each utility will only have 1 tab (active recall 1 tab where they can update question)
      }

      {/*------------------------ ADD MODE COMPONENT ------------------------*/}
      {addModeSingleState &&
      <div className="single-card-container edit-single-card-container">
        <div className="scs__buttons-container">
          {/* when moved to its own component, make sure to update 'tab' to default to 'questions tab' first */}
          <div className={`${tab==='question'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('question')}>Question</div>
          <div className={`${tab==='active-recall'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('active-recall')}>Active Recall</div>
        </div>

        <div className="scs__content-container">
          <div className="error-group-container">
            <ul className="error-group">
                {errors.map((error, idx) => <li className="error-text" key={idx}>*{error}</li>)}
            </ul>
          </div>

          {/* edit question tab */}
          {tab==='question' && <div className="scs-cc__active-recall-container" >
            {<div className={`edit-required-containers ${question &&'edit-required-containers--invisble'}`}> *required </div>}
            <div className="edit-question"> <span>Question: </span></div>
            <textarea value={question} onChange={(e)=>setquestionE(e)} className="scs-cc-arc__text-area-content"></textarea>
          </div>}


          {/* active-recall edit extension */}
          {tab==='active-recall' && <div className="scs-cc__active-recall-container" >
            {<div className={`edit-required-containers ${correctAnswer &&'edit-required-containers--invisble'}`}> *required </div>}
            <div className="edit-correct-answer-title"> Current Answer:</div>
            <textarea value={correctAnswer} onChange={(e)=>setCorrectAnswerE(e)} className="recall-correct-answer-textarea"></textarea>
          </div>}
        </div>

        <div>
          {/* after adding successfully, reset counter */}
          <button className="scs-cc-arc__save-answer edit-create-button" onClick={add_new_item} > add and save</button>
        </div>
      </div>}
    </>
  )
}

export default QuizCardDetails
