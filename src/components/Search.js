import React from 'react'
import {
  InputBase,
  IconButton,
  Paper
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  padding: 2px 4px;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  background-color: #444444;
  display: flex;
`

const StyledInput = styled(InputBase)`
  color: #eeeeee;
  margin-left: 8px;
  flex: 1;
`

const StyledIconButton = styled(IconButton)`
  padding: 10px;
`

const Search = () => {
  return (
    <div>
      <StyledPaper component='form'>
        <StyledInput
          placeholder='Type to filter...'
        />
        <StyledIconButton type='submit'>
          <SearchIcon style={{ color: '#eeeeee' }} />
        </StyledIconButton>
      </StyledPaper>
    </div>
  )
}

export default Search