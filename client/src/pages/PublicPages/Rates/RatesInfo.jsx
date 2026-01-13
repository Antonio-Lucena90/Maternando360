import React, { Children } from 'react'

export const RatesInfo = ({currentInfo, children, id}) => {
  return (
    <div>
      {currentInfo === id ? <div>{children}</div> : null}
    </div>
  )
}
