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
import authorService from '../services/author'
import publicationService from '../services/publication'
import { useHistory } from 'react-router-dom'
import { useStore, useDispatch } from 'react-redux'

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #cccccc;
`

const Author = props => {
  const store = useStore()
  const dispatch = useDispatch()
  const history = useHistory()
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const author = await authorService.getById(props.match.params.id)
      if (author) {
        setAuthor(author)
        const data = await publicationService.getByAuthor(props.match.params.id)
        const state = store.getState()
        dispatch({
          type: 'TICK',
          ...state,
          publications: data.rows
        })
      } else history.replace('/404')
    }

    setAuthor(null)
    fetchData()
  }, [props.match.params])

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
          {author && <>
            <Box flexGrow={1}>
              <StyledTypography>{`All publications by ${author.firstName} ${author.lastName}`}</StyledTypography>
            </Box>
            <Box>
              <RevertButton />
            </Box>
          </>}
        </Box>
        <PublicationList />
      </Container>
    </MainLayout>
  )
}

export default Author
