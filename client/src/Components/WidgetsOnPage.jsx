import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Navbar } from "../Pages/Navbar/Navbar";
import React from "react";

const WidgetsOnPage = ({
  navbar = true,
  title,
  leftComponent,
  rightComponent,
}) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      {navbar && <Navbar />}
      {title && (
        <Box
          width={"100%"}
          p={"1rem 6%"}
          textAlign="center"
          backgroundColor={theme.palette.background}
        >
          <Typography
            fontWeight={"bold"}
            fontSize={"1.5rem"}
            color={theme.palette.neutral.main}
          >
            {title}
          </Typography>
        </Box>
      )}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      ></Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box width={isNonMobileScreens ? "40vw" : "90vw"}>
          {leftComponent}
          <Box m="1rem 0" />
        </Box>
        <Box
          width={isNonMobileScreens ? "60vw" : "90vw"}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {rightComponent}
        </Box>
      </Box>
    </Box>
  );
};

export default WidgetsOnPage;
