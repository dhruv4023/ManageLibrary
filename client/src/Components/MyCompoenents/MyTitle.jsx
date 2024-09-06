import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React from 'react'

const MyTitle = ({ txt }) => {
  const theme = useTheme()
  return (
    <Box
      fontWeight={'bold'}
      fontSize={'1.5rem'}
      color={theme.palette.primary.main}
    >
      {txt}
    </Box>
  )
}

export default MyTitle
