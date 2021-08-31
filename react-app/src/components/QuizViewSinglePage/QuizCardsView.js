import React, {useState} from 'react'
import './QuizCardsView.css'
import QuizCardDetails from '../QuizCardDetails/QuizCardDetails'

const QuizCardsView = ({allQuizCardsDataArray, editMode=false}) => {
  // console.log("all quiz data", allQuizCardsDataArray[0])

  const [editModeState, seteditModeState] = useState(editMode)


  return (
    <>
      <div className="cards-header-container">reserved for header content</div>
      <div className="cards-content-container"> Cards </div>
      {/* button to switch to editMode true */}



      {/* map each card data and add it to card component */}
      {allQuizCardsDataArray && allQuizCardsDataArray.map(singleCardData => (
        <QuizCardDetails editMode={editModeState} singleCardData={singleCardData}/>
      ))}

      {/* FOR SURE. separate to QuizCardDetails to edit component for more flexibility */}
      {/* if edit mode, go to mass edit: map for each <QuizCardEditMode */}


      {/* if edit mode, have button to add cards */}

    </>
  )
}

export default QuizCardsView
