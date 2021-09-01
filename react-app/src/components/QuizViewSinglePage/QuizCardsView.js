import React, {useState} from 'react'
import './QuizCardsView.css'
import QuizCardDetails from '../QuizCardDetails/QuizCardDetails'

const QuizCardsView = ({allQuizCardsDataArray, quizDeckMetadata, editMode=false}) => {
  // console.log("all quiz data", allQuizCardsDataArray[0])
  // console.log("quiz deck meta", quizDeckMetadata)
  // console.log("quiz deck meta copy", quizDeckMetadataCopy)
  // const quizDeckMetadataCopy = {...quizDeckMetadata}

  const [editModeState, seteditModeState] = useState(editMode);
  const [itemsToAdd, setItemsToAdd] = useState([]);

  const handleScrollBottom = ()=> {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
  const handleScrollTop = ()=> {
    window.scroll({
      top: document.body.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  }

  const addNewCard = ()=>{
    setItemsToAdd(itemsToAdd => [...itemsToAdd, true]);
    handleScrollBottom();
  }

  return (
    <>
      {!editMode && <div className="cards-header-container">
        <div className="chc__title">Cards</div>
      </div>}

      {editMode && <div className="cards-header-container header-edit">
        <div className="chc__title">Cards</div>
        <div onClick={handleScrollBottom} className="vanilla-round-button-1">
          <i class="fas fa-plus add-card-button-icon"></i>
        </div>
      </div>}

      {/* button to switch to editMode true */}

      {/* map each card data and add it to card component */}
      {allQuizCardsDataArray && allQuizCardsDataArray.map(singleCardData => (
        <QuizCardDetails editMode={editModeState} singleCardData={singleCardData}/>
      ))}

      {/* newly created items to be added under 'addMode' */}
      {itemsToAdd && editMode &&
        itemsToAdd.map(()=> <QuizCardDetails
        quizMetadata={quizDeckMetadata}  addMode={true}/>)

      }




      {/* if edit mode, have button to add cards */}
      {editMode &&
      <div className="edit-add-card-button-container">
        <div onClick={addNewCard} className="vanilla-button-1">Add New Card</div>
        <div onClick={handleScrollTop} className="vanilla-square-button-1 edit-go-to-top-position"><i class="fas fa-chevron-up edit-up-icon"></i> </div>
      </div>}


    </>
  )
}

export default QuizCardsView
