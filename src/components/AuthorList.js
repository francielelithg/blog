import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
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

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #dddddd;
`

const StyledListItem = styled(ListItem)`
  padding-left: 0px;
  padding-right: 0px;
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

const AuthorList = () => {
  const [authors, setAuthors] = useState(null)
  const store = useStore()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await authorService.getAll()
      if (data) setAuthors(data)
    }

    fetchData()
  }, [])

  const handleSelectAuthor = (event, authorId) => {
    const state = store.getState()

    dispatch({
      type: 'TICK',
      ...state,
      selectedAuthor: authorId
    })
  }

  return (
    <div>
      <Box mb={2}>
        <StyledTypography>Authors</StyledTypography>
      </Box>
      <List component='nav' dense>
        {authors && authors.map((author, index) => (
          <StyledListItem key={index} onClick={(event) => handleSelectAuthor(event, author.id)}>
            <ListItemAvatar>
              <StyledAvatar>
                <PersonIcon />
              </StyledAvatar>
            </ListItemAvatar>
            <StyledListItemText primary={`${author.firstName} ${author.lastName}`} />
          </StyledListItem>
        ))}
      </List>
    </div>
  )
}

export default AuthorList