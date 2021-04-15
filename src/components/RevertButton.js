import React, { useState } from 'react'
import {
  Button
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { useStore, useDispatch } from 'react-redux'

const RevertButton = () => {
  const store = useStore()
  const dispatch = useDispatch()
  const [desc, setDesc] = useState(true)

  const handleRevertOrder = event => {
    event.preventDefault()

    const state = store.getState()
    cleanPublications(state)

    let revert

    if (desc) {
      revert = state.publications.sort((a, b) => { 
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    } else {
      revert = state.publications.sort((a, b) => { 
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    }

    setDesc(!desc)

    dispatch({
      type: 'TICK',
      ...state,
      publications: revert
    })
  }

  const cleanPublications = (state) => {
    dispatch({
      type: 'TICK',
      ...state,
      publications: null
    })
  }

  return (
    <Button
      color='primary'
      size='large'
      startIcon={desc ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      onClick={handleRevertOrder}>
      {desc ? 'Latest' : 'Oldest'}
    </Button>
  )
}

export default RevertButton
