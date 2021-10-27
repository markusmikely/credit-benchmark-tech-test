import React from 'react'

const SwitchButton = props => {

  const { type, change } = props

  const switchToVal = (type.type === 'PD') ? 'LGD' : 'PD'
  const switchToLabel = (type.type === 'PD') ? 'LGD' : 'Rating'

  return (
    <div>
      <p>Current Type: {type.type}</p>
      <button onClick={() => change(switchToVal)}>Change to {switchToLabel}</button>
    </div>
  )
}

export default SwitchButton
