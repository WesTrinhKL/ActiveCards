import React from 'react'
import './Workspace.css'
const Workspace = () => {
  // use single fetch call to:
    // get all users workspace
    // get all users directory for each workspace
    // get all deck cover templates for each workspace


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
            content header
          </div>
          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              content folders or files
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
