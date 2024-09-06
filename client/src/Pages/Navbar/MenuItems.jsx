import React from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { setMode } from "../../state";

const MenuItems = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  const toggleMode = () => {
    dispatch(setMode());
  };

  return (
    <>
      <IconButton onClick={toggleMode}>
        <Tooltip
          title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme.palette.mode === "dark" ? (
            <LightMode sx={{ fontSize: "25px" }} />
          ) : (
            <DarkMode sx={{ fontSize: "25px", color: dark }} />
          )}
        </Tooltip>
      </IconButton>
    </>
  );
};

export default MenuItems;
