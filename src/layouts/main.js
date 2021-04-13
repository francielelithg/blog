import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  width: 320px;
  background-color: #222222;
  border-radius: 0px;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  border: 0px;
`

const StyledMain = styled.main`
  margin-left: 320px;
  padding: 40px;
`

const Main = props => {
  const [open] = useState(true)

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ component: StyledPaper }}
      >
      </Drawer>
      <StyledMain>
        {props.children}
      </StyledMain>
    </div>
  )
}

export default Main
