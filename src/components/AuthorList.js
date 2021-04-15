import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import styled from 'styled-components'
import authorService from '../services/author'
import { useStore, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #dddddd;
`

const StyledListItem = styled(ListItem)`
  padding: 8px 32px;
  transition: 0.5s;
  &:hover {
    background-color: #de4837;
  }
`

const StyledAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  color: #eeeeee;
  background: #333333;
`

const StyledListItemText = styled(ListItemText)`
  color: #ffffff;
  font-weight: bold;
`

const AuthorList = props => {
  const store = useStore()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [authors, setAuthors] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (props.authors.length === 0) {
        const data = await authorService.getAll()
        if (data) {
          const state = store.getState()
          dispatch({
            type: 'TICK',
            ...state,
            authors: data
          })
          setLoading(false)
          setAuthors(data)
        }
      } else {
        setAuthors(props.authors)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSelectAuthor = (event, author, index) => {
    const state = store.getState()

    setSelected(index)

    dispatch({
      type: 'TICK',
      ...state,
      selectedAuthor: author,
      publications: null
    })
  }

  return (
    <div>
      <Box mb={2} px={4}>
        <StyledTypography>Authors</StyledTypography>
      </Box>
      {!loading && <List component='nav' dense>
        {authors && authors.map((author, index) => (
          <Link to={`/author/${author.id}`} key={index}>
            <StyledListItem
              onClick={(event) => handleSelectAuthor(event, author, index)}
              selected={selected === index}
            >
              <ListItemAvatar>
                <StyledAvatar>
                  <PersonIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <StyledListItemText primary={`${author.firstName} ${author.lastName}`} />
            </StyledListItem>
          </Link>
        ))}
      </List>}
      {loading && <Box mt={4} display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>}
    </div>
  )
}

export default connect((state) => state)(AuthorList)