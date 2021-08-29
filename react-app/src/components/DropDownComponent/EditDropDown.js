import React from 'react'
import './DropDown.css'

import { NavLink } from 'react-router-dom';
const EditDropDown = () => {
  return (
    <div>
      <div className="ellipse-dropdown-container">
        <i class="fas fa-ellipsis-h sai__settings"></i>
        <div className="content-dropdown-container">
          <div className="ellipse-triangle-container">
            <div className="ellipse-dropdown-triangle-arrow-up"></div>
          </div>

          <div className="user-navbar-content">
            <div className="unc__item"><i class="fas fa-folder basic-style-icon"></i> Change Folder</div>
            <div className="unc__item"><i className="fas fa-edit basic-style-icon"></i>Edit Banner</div>
            {/* <div className="unc_hr-container">
              <hr className="unc_hr" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDropDown
