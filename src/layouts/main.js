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
import { Link } from 'react-router-dom'

const StyledPaper = styled(Paper)`
  width: 370px;
  background-color: #222222;
  border-radius: 0px;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  padding: 50px 0px;
  border: 0px;
`

const StyledTypography = styled(Typography)`
  border-left: 5px solid #de4837;
  padding-left: 25px;
  font-size: 42px;
  color: #dddddd;
`

const StyledMain = styled.main`
  margin-left: 370px;
  padding: 70px;
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
        <Box px={4}>
          <Link to='/'><StyledTypography>Blog</StyledTypography></Link>
        </Box>
        <Box my={4} px={4}>
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
