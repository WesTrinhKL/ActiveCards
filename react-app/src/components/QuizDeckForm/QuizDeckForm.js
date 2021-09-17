import React , { useState, useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './QuizDeckForm.css';
import { useHistory } from 'react-router';
import { getUserFirstDirectory } from '../../store/directory';
import { setFormQuizDeckTemp, getSingleDeckWithCardsByIdThunk, updateFormQuizDeckTempThunk } from '../../store/quiz_deck';


export const QuizDeckForm = ({editModeOn, quiz_id}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const user_id = useSelector((state) => state.session.user?.id);
  const user_first_directory_id = useSelector(state => state.directory.userFirstDirectory?.first_directory?.id)
  // console.log("edit mode" , editModeOn)
  const single_deck_and_cards = useSelector(state=> state.quiz_deck.single_deck_with_cards?.quiz);

  const current_title =  editModeOn ? single_deck_and_cards?.title : '';
  const current_description =  editModeOn ? single_deck_and_cards?.description : '';
  const current_is_private =  editModeOn ? String(single_deck_and_cards?.is_private) : 'false';
  const current_deck_id = editModeOn ? String(single_deck_and_cards?.id) : null;

  const [title, setTitle] = useState( current_title);
  const [description, setDescription] = useState(current_description);
  const [isPrivate, setIsPrivate] = useState(current_is_private);
  const [errors, setErrors] = useState([]);

  const setTitleE = (e) => setTitle(e.target.value);
  const setDescriptionE = (e) => setDescription(e.target.value);
  const setPrivateE = (e) => {
    console.log(isPrivate);
    return setIsPrivate(e.target.value);
  }

  useEffect(() => {
    dispatch(getUserFirstDirectory())
    if (editModeOn && quiz_id){
      dispatch(getSingleDeckWithCardsByIdThunk(quiz_id))
    }
  }, [dispatch])

  const onFormSubmit = (e)=>{
    e.preventDefault();
      const payload = {
        title,
        description,
        is_private: isPrivate,
        quiz_directory_id: user_first_directory_id,
        user_id,
        id: current_deck_id
      }
      setErrors([]);
      if (quiz_id && editModeOn) {
        dispatch(updateFormQuizDeckTempThunk(payload)).then( (data)=>{
          if(data && data.id){
            console.log("time to reload", data)
            // history.push(`/view/quizzes/${data.id}`);
            alert("updated successfully!");
            window.location.reload();
          }
          else if(data && data.errors){
            setErrors(data.errors);
          }
          else{
            setErrors(['something went wrong, please try again.'])
          }
        }).catch(async (res) =>{
          console.log("error hit")
          const data = res
          if(data && data.errors) setErrors(data.errors);
        })
      }
      else{
        dispatch(setFormQuizDeckTemp(payload)).then( (data)=>{
          if(data && data.id){
            console.log("time to reload", data)
            history.push(`/edit/quizzes/${data.id}`);
            window.location.reload();
          }
          else if(data && data.errors){
            setErrors(data.errors);
          }
          else{
            setErrors(['something went wrong, please try again.'])
          }
        }).catch(async (res) =>{
          console.log("error hit")
          const data = res
          if(data && data.errors) setErrors(data.errors);
        })
      }
  }

  return (

    <div className="quiz-deck-form-container">
      <form onSubmit={onFormSubmit}>

        <div className="qdfc__header"> {editModeOn? 'Edit': 'Create'} Your Deck</div>
        <ul className="error-group">
            {errors.map((error, idx) => <li className="error-text" key={idx}>*{error}</li>)}
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
        </div>

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


          {/* private or public */}
          <div className="privacy-input-container">
            <label className="pic_switch">
              Is Private:
            </label>
            <div class="quiz-deck-form-toggle-private">
              <input type="radio" id="radio-one" name="switch-one" value='true' onChange={setPrivateE}  checked={isPrivate==='true'}/>
              <label for="radio-one">Yes</label>
              <input type="radio" id="radio-two" name="switch-one" value='false' onChange={setPrivateE} checked={isPrivate==='false'} />
              <label for="radio-two">No</label>
            </div>
          </div>

          {/* Select a directory */}
          <div className="privacy-input-container">
            <label className="pic_switch">
              Select Directory:
            </label>
            <div className="quiz-deck-form-select-directory no-drop">
              <div className="qdfsd__container no-drop">
                <i class="fas fa-folder directory-icon"></i>
                <div className="qdfsd-c__change-directory"> <span className="selected-workspace-name"> Workspace/ </span> <span className="selected-directory-name">Home</span></div>
              </div>

            </div>
          </div>



          <div className="create-deck-button-container">
            <button className="create-deck-form-button" type="submit">{editModeOn? 'Update Banner': 'Start Deck'} <i class="fas fa-long-arrow-alt-right start-deck-arrow"></i></button>
          </div>

      </form>
    </div>
  )
}
