import React from 'react'
import styled from 'styled-components'

const StyledButton  = styled.div`
  background: #eee;
  padding: 15px 0;
  text-align: center;
  p {
    text-transform: uppercase;
    font-weight: bold;
  }
  button {
    padding: 10px 15px;
    text-transform: uppercase;
    margin: 0 auto 15px;
    border: 1px solid #545454;
    border-radius: 5px;
  }
`

const SwitchButton = props => {

  const { type, change } = props

  const switchToVal = (type.type === 'PD') ? 'LGD' : 'PD'
  const switchToLabel = (type.type === 'PD') ? 'LGD' : 'Rating'

  return (
    <StyledButton>
      <p>Current Type: {type.type}</p>
      <button onClick={() => change(switchToVal)}>Change to {switchToLabel}</button>
    </StyledButton>
  )
}

export default SwitchButton
