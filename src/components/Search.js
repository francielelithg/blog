import React, { useState } from 'react'
import {
  InputBase,
  IconButton,
  Paper
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useStore, useDispatch } from 'react-redux'

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
  const store = useStore()
  const dispatch = useDispatch()
  const history = useHistory()
  const [input, setInput] = useState('')

  const handleChange = event => {
    event.preventDefault()
    setInput(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const state = store.getState()
    cleanPublications(state)
    history.push(`/search/${input}`)
  }

  const cleanPublications = (state) => {
    dispatch({
      type: 'TICK',
      ...state,
      publications: null
    })
  }  

  return (
    <div>
      <StyledPaper component='form'>
        <StyledInput
          placeholder='Type to filter publications...'
          value={input}
          onChange={handleChange}
        />
        <StyledIconButton disabled={input.length === 0} type='submit' onClick={handleSubmit}>
          <SearchIcon style={{ color: '#eeeeee' }} />
        </StyledIconButton>
      </StyledPaper>
    </div>
  )
}

export default Search