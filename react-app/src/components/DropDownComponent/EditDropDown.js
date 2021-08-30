import React from 'react'
import './DropDown.css'
import QuizDeckFormModal from '../QuizDeckForm';

// import { NavLink } from 'react-router-dom';
const EditDropDown = ({quiz_id}) => {
  return (
    <div>
      <div className="ellipse-dropdown-container">
        <i class="fas fa-ellipsis-h sai__settings"></i>
        <div className="content-dropdown-container">
          <div className="ellipse-triangle-container">
            <div className="ellipse-dropdown-triangle-arrow-up"></div>
          </div>

          <div className="ellipse-navbar-content">
            <div className="unc__item"><i class="fas fa-folder basic-style-icon"></i>Change Folder</div>
            <QuizDeckFormModal quiz_id={quiz_id} editModeOn={true}/>
            {/* move edit button to modal index later*/}
            <div className="unc_hr-container">
              <hr className="unc_hr" />
            </div>
            <div className="unc__item"><i class="fas fa-window-close basic-style-icon"></i>Delete All</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDropDown
