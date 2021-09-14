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
        <div>
          Navigation / Directories
          {/* onClick, set directoryView true and setDirectory to selected  */}
        </div>
        <div>
          Content Container changes depending on selected
          <div>
            content header
          </div>
          <div>
            content folders or files
          </div>
          <div>
            metadata
          </div>
        </div>
      </div>

    </>
  )
}

export default Workspace
