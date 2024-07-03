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
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ headerContent }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (link) => {
    if (link === "/logout") {
      Cookies.remove("jwtToken");
      navigate("/");
    } else {
      navigate(link);
      closeMenu();
    }
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
            {headerContent.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                onClick={() => handleMenuItemClick(item.link)}
              >
                {item.title}
              </Button>
            ))}
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
                {headerContent.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleMenuItemClick(item.link)}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
