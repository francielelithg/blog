import React, { useState, useEffect } from 'react'
import {
  Box,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const StyledListItem = styled(ListItem)`
  border-top: 1px solid #dddddd;
  transition: 0.5s;
  &:hover {
    background-color: #efefef;
  }
`

const StyledListItemText = styled(ListItemText)`
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
  font-size: 12px;
  color: #de4837;
  margin-left: 8px;
`

const StyledChip = styled(Chip)`
  background: transparent;
  color: #bbbbbb;
`

const StyledScheduleIcon = styled(ScheduleIcon)`
  color: #bbbbbb;
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
      {!loading && publications && publications.length > 0 && <List component='nav' dense>
        {publications.map((publication, index) => (
          <Link to={`/publication/${publication.id}`} key={index}>
            <StyledListItem>
              <StyledListItemText>
                <StyledTitle>{publication.title}</StyledTitle>
                <Box display ='flex'>
                  <Box flexGrow={1}>
                  <StyledSubtitle>
                    {`${publication.author.firstName} ${publication.author.lastName}`}
                    <StyledEmail>{`<${publication.author.email}>`}</StyledEmail>
                  </StyledSubtitle>
                  </Box>
                  <Box>
                    <StyledChip
                      size="small"
                      icon={<StyledScheduleIcon />}
                      label={`${new Date(publication.createdAt).toLocaleDateString()}
                      ${new Date(publication.createdAt).toLocaleTimeString()}`}
                    />
                  </Box>
                </Box>
              </StyledListItemText>
            </StyledListItem>
          </Link>
        ))}
      </List>}
      {!loading && !publications && <StyledSubtitle>
        No publications were found.
      </StyledSubtitle>}
      {loading && <Box mt={4} display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>}
    </div>
  )
}

export default connect((state) => state)(AuthorList)