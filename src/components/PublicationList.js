import React, { useState, useEffect } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import styled from 'styled-components'
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
  const [publications, setPublications] = useState(null)

  useEffect(() => {
    setPublications(props.publications)
  }, [props])

  return (
    <div>
      <List component='nav' dense>
        {publications && publications.map((publication, index) => (
          <StyledListItem key={index}>
            <StyledListItemText>
              <StyledTitle>{publication.title}</StyledTitle>
              <Box display ='flex'>
                <Box flex={1}>
                <StyledSubtitle>
                  {`Posted by ${publication.author.firstName} ${publication.author.lastName}`}
                  <StyledEmail>{publication.author.email}</StyledEmail>
                </StyledSubtitle>
                </Box>
                <Box flexGrow>
                  <StyledSubtitle>{`${new Date(publication.createdAt).toLocaleDateString()}
                    ${new Date(publication.createdAt).toLocaleTimeString()}`}</StyledSubtitle>
                </Box>
              </Box>
            </StyledListItemText>
          </StyledListItem>
        ))}
      </List>
    </div>
  )
}

export default connect((state) => state)(AuthorList)