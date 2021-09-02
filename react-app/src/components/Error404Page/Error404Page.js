import React from 'react'

const Error404Page = ({errorMessage}) => {
  return (
    <div>
      404: Sorry, not found!
      {/* later have server send error status as well in a property */}
    </div>
  )
}

export default Error404Page
