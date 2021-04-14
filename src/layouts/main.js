import React, { useState } from 'react'
import {
  Box,
  Drawer,
  Paper,
  Typography
} from '@material-ui/core'
import Search from '../components/Search'
import AuthorList from '../components/AuthorList'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  width: 300px;
  background-color: #222222;
  border-radius: 0px;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  padding: 50px 35px;
  border: 0px;
`

const StyledTypography = styled(Typography)`
  font-size: 42px;
  color: #dddddd;
`

const StyledMain = styled.main`
  margin-left: 370px;
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
        <StyledTypography>Blog</StyledTypography>
        <Box my={2}>
          <Search />
        </Box>
        <Box my={2}>
          <AuthorList />
        </Box>
      </Drawer>
      <StyledMain>
        {props.children}
      </StyledMain>
    </div>
  )
}

export default Main
