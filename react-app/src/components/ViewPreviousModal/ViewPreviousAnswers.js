import React from 'react'
import './ViewPreviousAnswers.css';

const ViewPreviousAnswers = ({previousAnswers}) => {
  // const date_data = previousAnswers.date_age;
  // let date_age;
  // if (date_data.difference_days !== 0) date_age = `${date_data.difference_days} days ago`;
  // if (date_data.difference_months !== 0) date_age = `${date_data.difference_months} months ago`;
  const process_date = ({difference_months,difference_days,difference_hours,difference_minutes}) =>{
      if (difference_months > 0) return `${difference_months} months ago`
      if (difference_days > 0) return `${difference_days} days ago`
      if (difference_hours > 0) return `${difference_hours} hours ago`
      if (difference_minutes > 0) return `${difference_minutes} minutes ago`
      return `seconds ago`


  }

  console.log("user prev answers", previousAnswers)
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
                answer: {answer.user_active_answer}
            </div>
          </>))}
          <div className="vpc__all-comments-container">
        {previousAnswers && previousAnswers.map(answer=>(<>
          <div className="vpc-acc__answer-title">
            created: <span>{process_date( answer.date_age )}</span>
          </div>
          <div className="answer-title__item-answer-container">
              answer: {answer.user_active_answer}
          </div>
        </>))}
      </div>
      <div className="vpc__all-comments-container">
        {previousAnswers && previousAnswers.map(answer=>(<>
          <div className="vpc-acc__answer-title">
            created: <span>{process_date( answer.date_age )}</span>
          </div>
          <div className="answer-title__item-answer-container">
              answer: {answer.user_active_answer}
          </div>
        </>))}
      </div>
        </div>
      </div>


    </div>
  )
}

export default ViewPreviousAnswers
