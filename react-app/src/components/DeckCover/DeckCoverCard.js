import React ,{useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './QuizViewSinglePage.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck';
import Error404Page from '../Error404Page/Error404Page';
import EditDropDown from '../DropDownComponent/EditDropDown';
import QuizCardsView from './QuizCardsView';

const DeckCoverCard = () => {
  return (
    <div>

    </div>
  )
}

export default DeckCoverCard
