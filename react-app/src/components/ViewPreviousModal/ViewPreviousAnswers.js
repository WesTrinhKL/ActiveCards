import React from 'react'
import './ViewPreviousAnswers.css';
import { process_date } from '../utilities/util';

const ViewPreviousAnswers = ({previousAnswers}) => {


  console.log("user prev answers:", previousAnswers)
  return (
    <div className="view-previous-container">
      <div className="vpc__previous-answers-content"> Your Previous Answers</div>
      <div className="vpc__wrapper">
        <div className="vpc__all-comments-container">
          {previousAnswers && previousAnswers.map(answer=>(<>
            <div className="vpc-acc__answer-title">
              created: <span>{process_date( answer.date_age )}</span>
            </div>
            <div className="answer-title__item-answer-container">
                {answer.user_active_answer}
            </div>
          </>))}

        </div>
      </div>


    </div>
  )
}

export default ViewPreviousAnswers
