import React from 'react'
import {
  Button
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
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
      startIcon={<ArrowBackIcon />}
      onClick={handleBack}>
      Back
    </Button>
  )
}

export default BackButton