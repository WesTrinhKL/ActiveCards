
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/session';
import defaultavatar from '../images/defaultavatar.jpg'



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
      <ul className="nc__unordered-list">
        <div className="nc-l__logo">
          <li className="nc-l-logo__name">
            <NavLink className="nc-l-logo__name" to='/' exact={true} activeClassName='active'>
              ActiveCards
            </NavLink>
          </li>
        </div>

        <div className="nc-l__middle">
          <div className="nc-lm__search-container">
            <i class="fas fa-search navbar-search-icon"></i>
            <input className="navbar-search-input"type="text" placeholder="Search " />

          </div>
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

          {user && <li>
              <div className="user-navbar-container">
                <NavLink to='/users' exact={true} activeClassName='active'>
                  <img className="avatar-image" src={defaultavatar} alt="" />
                </NavLink>
                <div className="dropdown-content-container">
                  <div className="triangle-container">
                    <div className="dropdown-triangle-arrow-up"></div>
                  </div>

                  <div className="user-navbar-content">
                    <div className="unc__item">one</div>
                    <div className="unc__item">two</div>
                    {user && <div className="user-navbar-logout unc__item ">
                      <LogoutButton />
                    </div>}
                  </div>
                </div>

              </div>
              <div>

              </div>
          </li>}
        </div>


      </ul>
    </nav>
  );
}

export default NavBar;
