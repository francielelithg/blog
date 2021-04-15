import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography
} from '@material-ui/core'
import MainLayout from '../layouts/main'
import PublicationList from '../components/PublicationList'
import RevertButton from '../components/RevertButton'
import styled from 'styled-components'
import publicationService from '../services/publication'
import { useStore, useDispatch } from 'react-redux'

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #cccccc;
`

const App = () => {
  const store = useStore()
  const dispatch = useDispatch()

  useEffect(() => {
    const state = store.getState()
    cleanPublications(state)

    const fetchData = async (state) => {
      const data = await publicationService.getAll()

      dispatch({
        type: 'TICK',
        ...state,
        publications: data.rows
      })
    }

    fetchData(state)
  }, [])

  const cleanPublications = (state) => {
    dispatch({
      type: 'TICK',
      ...state,
      publications: null
    })
  }

  return (
    <MainLayout>
      <Container maxWidth='md'>
        <Box mb={2} display='flex'>
          <Box flexGrow={1}>
            <StyledTypography>All publications</StyledTypography>
          </Box>
          <Box>
            <RevertButton />
          </Box>
        </Box>
        <PublicationList />
      </Container>
    </MainLayout>
  )
}

export default App
