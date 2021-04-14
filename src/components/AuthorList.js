import React from 'react'
import {
  Typography
} from '@material-ui/core'
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #dddddd;
`

const AuthorList = () => {
  return (
    <StyledTypography>Authors</StyledTypography>
  )
}

export default AuthorList