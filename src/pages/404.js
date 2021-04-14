import React from 'react'
import {
  Box,
  Container,
  Typography
} from '@material-ui/core'
import BackButton from '../components/BackButton'
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #222222;
`
const StyledSubtitle= styled(Typography)`
  font-size: 16px;
  color: #222222;
`

const NotFound = () => {
  return (
    <Container maxWidth='sm'>
      <Box mt={8}>
        <StyledTypography align='center'>404 not found</StyledTypography>
      </Box>
      <Box mt={2} px={8}>
        <StyledSubtitle align='center'>It seems you're trying to access some content that is not currently available on Blog.</StyledSubtitle>
      </Box>
      <Box display='flex' mt={4}>
        <Box justifyContent='center'>
          <BackButton />
        </Box>
      </Box>
    </Container>
  )
}

export default NotFound
