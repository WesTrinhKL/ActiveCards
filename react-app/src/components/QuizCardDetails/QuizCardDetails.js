import React, {useState} from 'react'
import './QuizCardDetails.css'
import ViewPreviousModal from '../ViewPreviousModal'

const QuizCardDetails = ({singleCardData, editMode=false}) => {

  const [tab, setTab] = useState('active-recall')
  const [editModeSingleState, seteditModeSingleState] = useState(editMode)
  // state for allowAnswer (if active recall answered, allow answer)

  // single data properties: card_number, id, question, quiz_template_relation, title, user_relation
  // console.log('single data', singleCardData)

  const [question, setquestion] = useState(singleCardData.question)
  const [answer, setAnswer] = useState('')

  const setAnswerE = (e) => {
    setAnswer(e.target.value)
    // console.log("myanswer", answer);
  }

  return (
    <>
      {!editModeSingleState && singleCardData && <div className="single-card-container">
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
              <div className="scs-cc-arc__save-answer"> save answer</div>
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

      {/* EDIT MODE COMPONENT */}
      {editModeSingleState &&
        <div> Edit Mode for single card component</div>
      }
    </>
  )
}

export default QuizCardDetails
