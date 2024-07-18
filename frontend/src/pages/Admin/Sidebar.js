import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  People,
  LocalHospital,
  BarChart,
  Settings,
} from "@mui/icons-material";

import "../../css/Sidebar.css";
const drawerWidth = 240;

const Sidebar = ({ setSelectedSection }) => {
  return (
    <Drawer
      variant="permanent"
      className="drawer"
      classes={{
        paper: "drawerPaper",
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem button onClick={() => setSelectedSection("Home")}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          onClick={() => setSelectedSection("StudentManagement")}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Patient Management" />
        </ListItem>
        <ListItem button onClick={() => setSelectedSection("StaffManagement")}>
          <ListItemIcon>
            <LocalHospital />
          </ListItemIcon>
          <ListItemText primary="Staff Management" />
        </ListItem>
        <ListItem
          button
          onClick={() => setSelectedSection("ReportsAndAnalytics")}
        >
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Reports and Analytics" />
        </ListItem>
        <ListItem button onClick={() => setSelectedSection("Settings")}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
