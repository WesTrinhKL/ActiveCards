import React, {useState, useEffect}from 'react'
import './Landing.css'
import DeckCoverCard from '../DeckCover/DeckCoverCard'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllDeckCoversPaginatedThunk } from '../../store/quiz_deck'
import { getSingleDeckWithCardsByIdThunk } from '../../store/quiz_deck';

const Landing = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [currentPage, setcurrentPage] = useState(1)

  const user_id = useSelector((state) => state.session.user?.id);
  const all_decks_cover_paginated= useSelector(state=> state.quiz_deck.all_deck_covers_paginated?.quizzes)
  const belongs_to_user = user_id === all_decks_cover_paginated?.user_id;


  useEffect(() => {
    dispatch(getAllDeckCoversPaginatedThunk(currentPage))
  }, [dispatch])

  console.log("decks", all_decks_cover_paginated)
  return (
    <div className="landing-page-wrapper">
      <div className="lpw__landing-page">

        <div div div className="landing-page__header-container">
          <div className="lp-hc__title">Active Cards</div>
          <div  className="lp-hc__description"> Find a set that's right for your study needs, or create your own!  Here's a collection of recent and public sets available</div>
        </div>

        <div className="landing-page__content-container">
          {all_decks_cover_paginated && all_decks_cover_paginated.map((deckCover) => (
            < DeckCoverCard deckCover={deckCover} />
          ))}
        </div>

        <div className="landing-page__load-more-container">
          {/* <div className="lmc__load-more-button">Load More</div> */}
        </div>


      </div>

      <div className="plug">
          <div className="plug-content">
            <i className="plug-icon fab fa-github-alt"></i>
              <div className="plug-wrapper">
              <div className="plug-made-by">Made By: </div>
                <a className="plug-link" target="_blank" rel="noopener noreferrer" href="https://github.com/WesTrinhKL/ActiveCards">Wes Trinh <i className="fas fa-external-link-alt"></i></a>
            </div>
          </div>
        </div>
      </div>

  )
}

export default Landing
