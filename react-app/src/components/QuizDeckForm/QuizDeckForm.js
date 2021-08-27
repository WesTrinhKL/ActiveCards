import React , { useState, useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './QuizDeckForm.css';
import { useHistory } from 'react-router';



export const QuizDeckForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session.user?.id);


  const [title, setTitle] = useState('');

  const setTitleE = (e) => setTitle(e.target.value);

  const onFormSubmit = (e)=>{
    e.preventDefault();
      const payload = {
        title: title,
      }

  }

  return (
    <div>
      hello from modal
    </div>
  )
}
