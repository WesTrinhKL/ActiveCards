import React from 'react'

import { NavLink } from 'react-router-dom';
const ProfileDropDown= ({defaultavatar, LogoutButton, user}) => {
  return (
    <div>
      <div className="user-navbar-container">
        <NavLink to='/users' exact={true} activeClassName='active'>
          <img className="avatar-image" src={defaultavatar} alt="" />
        </NavLink>
        <div className="dropdown-content-container">
          <div className="triangle-container">
            <div className="dropdown-triangle-arrow-up"></div>
          </div>

          <div className="user-navbar-content">
            <div className="unc__item"><i class="fas fa-home home-icon"></i>Workspace</div>
            <div className="unc__item no-drop"><i class="fas fa-cog settings-icon no-drop"></i>Settings</div>
            <div className="unc_hr-container">
              <hr className="unc_hr" />
            </div>
            {user && <div className="user-navbar-logout unc__item "> <i class="fas fa-sign-out-alt logout-icon"></i><LogoutButton /> </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropDown
