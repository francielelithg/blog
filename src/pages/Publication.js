import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import styled from 'styled-components'
import MainLayout from '../layouts/main'
import BackButton from '../components/BackButton'
import publicationService from '../services/publication'

const StyledListItem = styled(ListItem)`
  padding-left: 0px;
  padding-right: 0px;
`

const StyledListItemText = styled(ListItemText)`
  border-bottom: 1px solid #dddddd;
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

const Publication = props => {
  const [publication, setPublication] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await publicationService.getById(props.match.params.id)
      setPublication(data)
    }

    fetchData()
  }, [props.match.params])

  return (
    <MainLayout>
      <Container maxWidth='md'>
        <BackButton />
        {publication && <>
          <List>
            <StyledListItem>
              <StyledListItemText>
                <StyledTitle>{publication.title}</StyledTitle>
                <Box display='flex'>
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
          </List>
          <Box mt={2}>
            <Typography variant='body1' align='justify'>{publication.body}</Typography>
          </Box>
        </>}
      </Container>
    </MainLayout>
  )
}

export default Publication
