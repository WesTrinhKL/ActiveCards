import React, {useState} from 'react'
import './QuizCardsView.css'
import QuizCardDetails from '../QuizCardDetails/QuizCardDetails'

const QuizCardsView = ({allQuizCardsDataArray}) => {
  console.log("all quiz data", allQuizCardsDataArray[0])


  return (
    <>
      <div className="cards-header-container">reserved for header content</div>
      <div className="cards-content-container"> Cards </div>

      {/* testing single card */}

      <QuizCardDetails/>

      <div className="add-card-container">
        <button>add, edit, or remove card (sends you to edit page)</button>
      </div>

    </>
  )
}

export default QuizCardsView
