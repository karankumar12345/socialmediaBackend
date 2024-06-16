import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const Found = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant="h2" style={{ padding: "2vmax" }}>
          Its Test purpose
        </Typography>

        <Link to="/home">
          <Typography variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default Found;