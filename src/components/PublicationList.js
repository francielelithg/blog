import React, { useState, useEffect } from 'react'
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const StyledListItem = styled(ListItem)`
  padding-left: 0px;
  padding-right: 0px;
`

const StyledListItemText = styled(ListItemText)`
  border-top: 1px solid #dddddd;
  padding: 16px 0px;
  color: #222222;
`

const StyledTitle = styled(Typography)`
  font-size: 24px;
`
const StyledSubtitle = styled(Typography)`
  font-size: 14px;
`
const StyledEmail = styled.span`
  font-size: 14px;
  font-style: italic;
  color: #cccccc;
  margin-left: 8px;
`

const AuthorList = props => {
  const [loading, setLoading] = useState(true)
  const [publications, setPublications] = useState(null)

  useEffect(() => {
    if (props.publications && props.publications.length > 0) {
      setPublications(props.publications)
      setLoading(false)
    } else if (!props.publications) {
      setPublications(null)
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [props])

  return (
    <div>
      {!loading && <List component='nav' dense>
        {publications && publications.map((publication, index) => (
          <Link to={`/publication/${publication.id}`} key={index}>
            <StyledListItem>
              <StyledListItemText>
                <StyledTitle>{publication.title}</StyledTitle>
                <Box display ='flex'>
                  <Box flexGrow={1}>
                  <StyledSubtitle>
                    {`Posted by ${publication.author.firstName} ${publication.author.lastName}`}
                    <StyledEmail>{publication.author.email}</StyledEmail>
                  </StyledSubtitle>
                  </Box>
                  <Box>
                    <StyledSubtitle>{`${new Date(publication.createdAt).toLocaleDateString()}
                      ${new Date(publication.createdAt).toLocaleTimeString()}`}</StyledSubtitle>
                  </Box>
                </Box>
              </StyledListItemText>
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