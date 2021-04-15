import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
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
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(null)
  const [limit] = useState(5)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const offset = (page - 1) * limit
      const data = await publicationService.getBySearch(props.match.params.string, limit, offset)
      setTotal(Math.ceil(data.count / limit))
      const state = store.getState()

      dispatch({
        type: 'TICK',
        ...state,
        publications: data.rows
      })
    }

    fetchData()
  }, [props.match.params, page])

  const handlePageChange = (event, selectedPage) => {
    event.preventDefault()
    const state = store.getState()
    cleanPublications(state)
    setPage(selectedPage)
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
          <StyledTypography>{`Searching publications with title '${props.match.params.string}'`} </StyledTypography>
        </Box>
        <PublicationList />
        <Box display='flex' justifyContent='center' mt={4}>
          {total && <Pagination count={total} page={page} shape='rounded' size='large' onChange={handlePageChange} />}
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Author
