import React from 'react'
import './ViewPreviousAnswers.css';

const ViewPreviousAnswers = ({previousAnswers}) => {
  // const date_data = previousAnswers.date_age;
  // let date_age;
  // if (date_data.difference_days !== 0) date_age = `${date_data.difference_days} days ago`;
  // if (date_data.difference_months !== 0) date_age = `${date_data.difference_months} months ago`;

  console.log("user prev answers", previousAnswers)
  return (
    <div className="view-previous-container">
      <div className="vpc__previous-answers-content"> Your Previous Answers</div>
      <div className="vpc__all-comments-container">
        {previousAnswers && <>
          <div className="vpc-acc__answer-title">
            created: <span>3 months ago</span>
          </div>
          <div className="answer-title__item-answer-container">
              answer:
          </div>
        </>}
      </div>

    </div>
  )
}

export default ViewPreviousAnswers
