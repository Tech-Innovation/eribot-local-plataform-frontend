import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./Logo";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "next-auth/react";
import { MENU_LIST } from "@utils/constants";

const drawerWidth = 240;

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar sx={{ bgcolor: "#2f5597" }} position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href={"/"}>
            <Typography
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CYBEREYE AIPSA
            </Typography>
          </Link>
          <Box
            justifyContent="flex-end"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {MENU_LIST.map((page) => (
              <Link href={page.href} key={page.text}>
                <Button
                  // disabled={pages[page].validUserTypes.indexOf(user.userType) === -1}
                  sx={{
                    "&.Mui-disabled": {
                      color: "#A3A3A3",
                    },
                    my: 2,
                    color: "white",
                    display: "block",
                    fontSize: "1rem",
                  }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              ERIBOT
            </Typography>
            <Divider />
            <List>
              {MENU_LIST.map((page) => (
                <Link href={page.href} key={page.text}>
                  <ListItem disablePadding>
                    <ListItemButton
                      // disabled={pages[page].validUserTypes.indexOf(user.userType) === -1}
                      sx={{ textAlign: "center", color: "rgba(0, 0, 0, 0.87)" }}
                    >
                      <ListItemText primary={page.text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
