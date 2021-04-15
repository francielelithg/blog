import React from 'react'
import {
  Button
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { useHistory } from 'react-router-dom'

const BackButton = () => {
  const history = useHistory()

  const handleBack = event => {
    event.preventDefault()
    history.goBack()
  }

  return (
    <Button
      color='primary'
      size='large'
      startIcon={<ChevronLeftIcon />}
      onClick={handleBack}>
      Back
    </Button>
  )
}

export default BackButton