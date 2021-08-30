import React, {useState} from 'react'
import './QuizCardsView.css'

const QuizCardsView = () => {

  const [tab, setTab] = useState('active-recall')

  return (
    <>
      <div className="cards-header-container">reserved for header content</div>
      <div className="cards-content-container"> Cards </div>

      {/* testing single card */}
      {/* logic for tabs: button changes state 'tab' and based on tab, render that one */}
      <div className="single-card-container">
        <div className="scs__buttons-container">
          {/* for each tab, add dynamic button and setTab to a property 'name-of-tab' */}
          <div className={`${tab==='active-recall'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('active-recall')}>Active Recall</div>
          <div className={`${tab==='answers'? 'scs-bc__tab-button--active': ""} scs-bc__tab-button`} onClick={()=>setTab('answers')}>Answers</div>
        </div>
        <div className="scs__content-container">
          {/* remember that each tab will have its own extensions. */}
          {tab==='active-recall' && <div>
            {/* in each tab, we'll have a button to add extension. Once clicked, you can select an extension from the collapsible on the right. Adding an extension will then add the component for that extension in the list that will be mapped. for each extension in extensions, render template and pass in extension data (or make individual extension components*/}
            active-recall content
            <div> question</div>
            <div> text area</div>
            <div> answer history + save answer </div>

          </div>}
          {tab==='answers' && <div>
            {/* each extension will have an optional answer property that the user can add. If not added, then don't render */}
            answers content
          </div>}
        </div>
      </div>

      <div className="add-card-container">
        <button>add card</button>
      </div>

    </>
  )
}

export default QuizCardsView
