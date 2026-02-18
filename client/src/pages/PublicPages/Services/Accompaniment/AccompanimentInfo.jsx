import React from 'react'

export const AccompanimentInfo = ({currentInfo, children, id}) => {
  return (
    <div>
      {currentInfo === id ? <div>{children}</div> : null}
    </div>
  )
}
