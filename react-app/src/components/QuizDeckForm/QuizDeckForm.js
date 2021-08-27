import React , { useState, useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './QuizDeckForm.css';
import { useHistory } from 'react-router';



export const QuizDeckForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session.user?.id);


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const setTitleE = (e) => setTitle(e.target.value);
  const setDescriptionE = (e) => setDescription(e.target.value);

  const onFormSubmit = (e)=>{
    e.preventDefault();
      const payload = {
        title,
        description,
      }


      // required data in payload besides form:
    // user_id
    //

      // TODO FORM
    // title
    // description optional
    // public or private button slider thing

    // add to first directory, then provide option to change directory in template EditQuiz page

  }

  return (

    <div className="quiz-deck-form-container">
      <form onSubmit={onFormSubmit}>

        <div className=""> Create Your Deck</div>
          <ul className="error-group">
              {errors.map((error, idx) => <li key={idx}>*{error}</li>)}
          </ul>

          {/* required inputs */}
          <div className="title-input-container">
            {/* title */}
            <div>
              <label className="">
                Title:
              </label>
            </div>
            <input className="quiz-deck-form-title"
                placeholder="ex: Algebra 2 Final Exam"
                required
                value={title}
                onChange={setTitleE}
                type="text" />


            {/* description */}
            <div className="description-input-container">
              <label className="">
                Description (optional):
              </label>
              <div>
              <textarea className="quiz-deck-form-text-area"
                  placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                  value={description}
                  onChange={setDescriptionE}
                  type="text" />
            </div>
            </div>

          </div>

          <div className="">
            <button className="create-deck-form-button" type="submit">Start Deck <i class="fas fa-long-arrow-alt-right start-deck-arrow"></i></button>
          </div>

      </form>
    </div>
  )
}
