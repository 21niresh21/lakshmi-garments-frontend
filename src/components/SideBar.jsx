import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import InsightsIcon from "@mui/icons-material/Insights";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from "react-router";

const drawerWidth = 240;

const StyledLink = styled(Link)({
  textDecoration: "none", // Removes underline
  color: "inherit", // Inherit the color from the parent
  "&:active": {
    color: "inherit", // Prevent color change on active
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  width: open ? drawerWidth : `calc(${theme.spacing(9)} + 1px)`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : `calc(${theme.spacing(9)} + 1px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
  },
}));

const SIDEBAR_ITEMS = [
  { isSubHeader: true, label: "Main" },
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    last: true,
    index: 1,
    link: "/dashboard",
  },
  { isSubHeader: true, label: "Analytics" },
  {
    icon: <InsightsIcon />,
    label: "Analytics",
    last: true,
    index: 2,
    link: "/analytics",
  },
  { isSubHeader: true, label: "User Management" },
  {
    icon: <PeopleIcon />,
    label: "Users",
    last: true,
    index: 3,
    link: "/users",
  },
  { isSubHeader: true, label: "Inventory Management" },
  {
    icon: (
      <Icon>
        <span className="material-symbols-outlined">package_2</span>
      </Icon>
    ),
    label: "Inventory",
    index: 4,
    link: "/stock",
  },
  {
    icon: <InventoryOutlinedIcon />,
    label: "Add Inventory",
    index: 5,
    link: "/stock-control",
  },
  {
    icon: <ReceiptLongIcon />,
    label: "Invoice",
    index: 6,
    link: "/invoice",
    last  : true,
  },
  { isSubHeader: true, label: "Production" },
  {
    icon: <PrecisionManufacturingIcon />,
    label: "Start Production",
    index: 7,
    link: "/production",
  },
  {
    icon: <DynamicFeedIcon />,
    label: "Batches",
    index: 8,
    link: "/batches",
    last: true,
  },
  { isSubHeader: true, label: "Master Data" },
  {
    icon: <SettingsIcon />,
    label: "Data Management",
    index: 9,
    link: "/data-management",
  }
];

function SideBar() {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    // Find the sidebar item whose link matches the current path
    const found = SIDEBAR_ITEMS.find(
      (item) => item.link && location.pathname === item.link
    );
    return found?.index || 1;
  });

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     setLoggedIn(false);
  //   }
  // }, [loggedIn]);

  return (
    <>
      {loggedIn && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Typography variant="h6" onClick={handleToggle}>
              LG
            </Typography>
            {open && (
              <IconButton onClick={handleToggle}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </DrawerHeader>
          <List>
            {SIDEBAR_ITEMS.map((item, index) =>
              item.isSubHeader ? (
                <Collapse in={open} timeout="auto" unmountOnExit key={index}>
                  <ListSubheader sx={{ lineHeight: 2 }}>
                    {item.label}
                  </ListSubheader>
                </Collapse>
              ) : (
                <>
                  <Tooltip title={item.label} placement="right" key={index}>
                    <StyledLink to={item.link} key={index}>
                      <ListItem disableGutters disablePadding>
                        <ListItemButton
                          selected={selectedIndex === item.index}
                          onClick={(event) =>
                            handleListItemClick(event, item.index)
                          }
                          sx={{ mr: 1, ml: 1, borderRadius: 2, minHeight: 50 }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          {open && <ListItemText>{item.label}</ListItemText>}
                        </ListItemButton>
                      </ListItem>
                    </StyledLink>
                  </Tooltip>
                  {item.last && <Divider sx={{ m: 1 }} key={item.label} />}
                </>
              )
            )}
          </List>
        </Drawer>
      )}
    </>
  );
}

export default SideBar;
