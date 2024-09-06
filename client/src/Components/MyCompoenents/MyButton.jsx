import { useTheme } from '@emotion/react'
import { Button } from '@mui/material'
import React from 'react'

const MyButton = ({
  disabled = false,
  label,
  onclickHandle,
  fullwidth = true,
  borderRadius
}) => {
  const theme = useTheme()
  return (
    <Button
      fullWidth={fullwidth}
      type='submit'
      onClick={onclickHandle}
      disabled={disabled}
      sx={{
        m: '1.2rem 0',
        p: '1rem',
        fontWeight:1000,
        borderRadius: borderRadius,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.neutral.light,
        '&:hover': { color: theme.palette.primary.main }
      }}
    >
      {label}
    </Button>
  )
}

export default MyButton
