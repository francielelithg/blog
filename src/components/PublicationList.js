import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import styled from 'styled-components'
import publicationService from '../services/publication'
import { useStore, useDispatch } from 'react-redux'

const StyledTypography = styled(Typography)`
  font-size: 24px;
  color: #cccccc;
`

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

const AuthorList = () => {
  const [publications, setPublications] = useState(null)
  const store = useStore()

  useEffect(() => {
    const fetchData = async () => {
      const data = await publicationService.getAll()
      if (data) setPublications(data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <Container maxWidth='md'>
        <Box mb={2} display='flex'>
          <Box flex={1}>
            <StyledTypography>All publications</StyledTypography>
          </Box>
          <Box flexGrow>
            <Button color="primary" startIcon={<KeyboardArrowUpIcon />}>Latest</Button>
          </Box>
        </Box>
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
      </Container>
    </div>
  )
}

export default AuthorList