import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  CssBaseline,
  Typography,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Menu,
  MenuList,
} from "@mui/material";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            RGUKT Hospital
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, marginLeft: "auto" }}>
            <IconButton
              color="inherit"
              size="large"
              edge="end"
              onClick={openMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuList>
                <MenuItem onClick={closeMenu}>Home</MenuItem>
                <MenuItem onClick={closeMenu}>About</MenuItem>
                <MenuItem onClick={closeMenu}>Contact</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
