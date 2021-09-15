import React, {useState, useEffect} from 'react'
import './Workspace.css'
const Workspace = () => {
  // use single fetch call to:
    // get all users workspace
    // get all users directory for each workspace
    // get all deck cover templates for each workspace
  let workspaceAndDirectories = [
    {home:
      [
        {first: ['deck1', 'deck2']}
      ]
    },
    {interviews:
      [
        {javascript: ['deck1', 'deck2']},
        {python: ['deck1', 'deck2']},
        {software: ['deck1', 'deck2']},
      ]
    },
    {art:
      [
        {french: ['deck1', 'deck2']},
        {american: ['deck1', 'deck2, deck3']}
      ]
    }, ]
    console.log("example of workspace", workspaceAndDirectories)

  return (
    <>
      <div className="workspace-container">
        <div className="wc__directories-nav">
          Navigation / Directories
          {/* onClick, set directoryView true and setDirectory to selected  */}
        </div>
        <div className="wc__content-container">
          {/* Content Container changes depending on selected */}
          <div className="wc-cc__header">
            <div className="cc-header__bread-crumbs">content header / breadcrumbs...</div>

          </div>
          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              <div className="wc-cc-fc-content__wrapper">
                <div className="content_wrapper__header">
                  Interviews
                </div>
              </div>
            </div>
            <div className="wc-cc-fc__metadata">
              metadata
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Workspace
