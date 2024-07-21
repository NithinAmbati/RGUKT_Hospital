import React from "react";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        padding: "1rem 0",
        marginTop: "2rem",
      }}
    >
      <Typography variant="body2">
        &copy; 2024 University Hospital. All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
