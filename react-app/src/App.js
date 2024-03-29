import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Landing from './components/Landing/Landing';
import EditQuizCardsPage from './components/EditQuizCardsPage/EditQuizCardsPage';
import QuizViewSinglePage from './components/QuizViewSinglePage/QuizViewSinglePage';
import Error404Page from './components/Error404Page/Error404Page';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Workspace from './components/WorkspacePage/Workspace';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // this call to the auth route in backend will fetch our user data, if logged in, will add to store (set user)
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/view/quizzes/:quiz_id' exact={true}>
          <QuizViewSinglePage />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <ProfilePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/edit/quizzes/:quiz_id' exact={true} >
          <EditQuizCardsPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/workspace' exact={true} >
          <Workspace />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Landing/>
        </Route>
        <Route path='*' >
          <Error404Page/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
