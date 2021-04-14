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
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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

const AuthorList = props => {
  const [authors, setAuthors] = useState(null)
  const [selected, setSelected] = useState(null)
  const store = useStore()
  const dispatch = useDispatch()

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
          setAuthors(data)
        }
      } else {
        setAuthors(props.authors)
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
      publications: []
    })
  }

  return (
    <div>
      <Box mb={2}>
        <StyledTypography>Authors</StyledTypography>
      </Box>
      <List component='nav' dense>
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
      </List>
    </div>
  )
}

export default connect((state) => state)(AuthorList)