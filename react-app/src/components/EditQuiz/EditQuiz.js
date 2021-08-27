import React from 'react'
import { useParams } from 'react-router'

const EditQuiz = () => {

  // verify that the user_id is the same as the one from the deck being requested in the url, otherwise 404
  // try to dispatch for the template / deck id, if error return 404 error
  // figure out a way to close modal using global context and save quiz_deck state
  let {quiz_id} = useParams()
  return (
    <div>
      Hello From Edit Quiz Page {quiz_id}
    </div>
  )
}

export default EditQuiz
