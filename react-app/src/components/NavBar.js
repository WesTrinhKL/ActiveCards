
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/session';
import defaultavatar from '../images/defaultavatar.jpg'
import QuizDeckFormModal from './QuizDeckForm';
import ProfileDropDown from './DropDownComponent/ProfileDropDown';


const NavBar = () => {

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const demo = async () => {
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  const user = useSelector(state => state.session.user);


  return (
    <nav className="navbar-container">

      {/* Logo */}
      <ul className="nc__unordered-list">
        <div className="nc-l__logo">
          <li className="nc-l-logo__name">
            <NavLink className="nc-l-logo__name" to='/' exact={true} activeClassName='active'>
              ActiveCards
            </NavLink>
          </li>
        </div>

        {/* search + all buttons and their state */}
        <div className={user ?  "nc-l__middle--loggedin": "nc-l__middle"}>
          {/* <div className="nc-lm__search-container">
            <i class="fas fa-search navbar-search-icon"></i>
            <input className="navbar-search-input"type="text" placeholder="Search " />
          </div> */}
        </div>

        <div className="nc-l__user-utilities" >
          {!user && <li>
            <NavLink  to='/login' exact={true} activeClassName='active'>
              <div className="nc-l-uu__login">
                <div className="nc-l-uu-login__text"> Login </div>
              </div>

            </NavLink>
          </li>}
          {!user && <li className="nc-l-uu__signup">
            <NavLink  to='/sign-up' exact={true} activeClassName='active'>
              <div className="sign-up-button">
                Sign Up
              </div>

            </NavLink>
          </li>}

          {!user && <li className="nc-l-uu__demo">
            <div className="demo-button" onClick={demo}> Demo </div>
          </li>}

          {user && <li className="nc-l-uu__create-deck-modal">
            <QuizDeckFormModal/>
          </li>}
          {/* profile dropdown: workspace, settings, logout */}
          {user &&
          <li className="nc-l-uu__profile">
            <ProfileDropDown defaultavatar={defaultavatar} LogoutButton={LogoutButton} user={user}/>
          </li>}
        </div>


      </ul>
    </nav>
  );
}

export default NavBar;
