import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Typography
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import MainLayout from '../layouts/main'
import PublicationList from '../components/PublicationList'
import styled from 'styled-components'
import publicationService from '../services/publication'
import { useStore, useDispatch } from 'react-redux'

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #cccccc;
`

const Author = props => {
  const store = useStore()
  const dispatch = useDispatch()
  const [desc, setDesc] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await publicationService.getByAuthor(props.match.params.id)
      const state = store.getState()

      dispatch({
        type: 'TICK',
        ...state,
        publications: data
      })
    }

    fetchData()
  }, [props.match.params])

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
    <MainLayout>
      <Container maxWidth='md'>
        <Box mb={2} display='flex'>
          <Box flex={1}>
            <StyledTypography>All publications by author</StyledTypography>
          </Box>
          <Box flexGrow>
            <Button
              color="primary"
              startIcon={desc ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
              onClick={handleRevertOrder}>
                {desc ? 'Latest' : 'Oldest'}
              </Button>
          </Box>
        </Box>
        <PublicationList />
      </Container>
    </MainLayout>
  )
}

export default Author