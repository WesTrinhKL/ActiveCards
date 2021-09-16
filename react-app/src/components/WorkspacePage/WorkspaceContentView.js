import React, {useState, useEffect} from 'react'

const WorkspaceContentView = ({directory_id}) => {
  const [id, setId] = useState(directory_id)

  return (
    <>
      {id &&
      <div>
        <div className="wc__content-container">
          {/* Content Container changes depending on selected */}
          <div className="wc-cc__header">
            <div className="cc-header__bread-crumbs">bread / crumbs</div>
          </div>
          <div className="wc-cc__files-container">
            <div className="wc-cc-fc__content">
              <div className="wc-cc-fc-content__wrapper">
                workspace content

              </div>
            </div>
            <div className="wc-cc-fc__metadata">
              workspace metadata
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default WorkspaceContentView
