import { AppBar, Toolbar, Box, Button, IconButton, Menu } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { displayedRoutes } from "src/app/app-routes";
import { headerColor } from "src/utilities/colors";
import { useRef } from "react";
import { useOpenClose } from "src/hooks/useOpenClose";

export default function Header() {
  const menuIconRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, handleMenuOpen, handleMenuClose] = useOpenClose();

  const links = displayedRoutes.map((route) => (
    <Button
      component={Link}
      key={route.name}
      to={route.path!}
      sx={{ my: 2, color: "black", display: "block" }}
      onClick={handleMenuClose}
    >
      {route.name}
    </Button>
  ));

  const menu = (
    <Menu
      sx={{ display: { xs: "block", sm: "none" } }}
      anchorEl={menuIconRef?.current}
      open={menuOpen}
      onClose={handleMenuClose}
    >
      {links}
    </Menu>
  );

  return (
    <AppBar sx={{ backgroundColor: headerColor }}>
      {menu}
      <Toolbar>
        <IconButton
          ref={menuIconRef}
          onClick={handleMenuOpen}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
          {links}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
