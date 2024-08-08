import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import LoginForm from "./LoginForm";
import "../css/HomeBody.css";

const HomeBody = () => {
  const staff = [
    { name: "Dr. Jagadheeshwar" },
    { name: "Dr. Mahesh" },
    { name: "Dr. Akhila" },
    { name: "Dr. Divya" },
    { name: "Dr. Sharzel" },
    { name: "Dr. Sharzaam" },
    { name: "Dr. Srinivas" },
  ];

  return (
    <>
      <div className="mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="mt-10 flex flex-col flex-grow gap-14">
            {/* Staff Details */}
            <Container maxWidth="md" style={{ marginTop: "2rem" }}>
              <Paper
                elevation={2}
                style={{
                  padding: "1rem",
                  maxHeight: "600px",
                  overflowY: "auto",
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Doctors
                </h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {staff.map((member, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "4px 0",
                      }}
                    >
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
              </Paper>
            </Container>

            {/* Important Numbers Section */}
            <Container maxWidth="sm">
              <Paper elevation={2}>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: "2px",
                  }}
                >
                  Important Numbers
                </h1>
                <List>
                  <ListItem className="mr-4">
                    <ListItemText primary="Emergency" secondary="911" />
                    <ListItemText primary="Ambulance" secondary="911" />
                  </ListItem>
                </List>
              </Paper>
            </Container>
          </div>

          {/* Carousel and Info Section */}
          <Container maxWidth="md" style={{ marginTop: "2rem" }}>
            <h1 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              About RGUKT Hospital
            </h1>
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              showStatus={false}
            >
              <div>
                <img
                  src="https://www.rgukt.ac.in/assets/images/rgukt/hospital.jpg"
                  alt="Slide 1"
                />
              </div>
            </Carousel>
            <Typography
              className="justified-text"
              style={{ marginTop: "16px" }}
            >
              The multifarious medical needs of the Campus population consisting
              of Students, Staff members and their families are met by the
              Institute Hospital. The Hospital is headed by the Head (Hospital
              Services) with a team of full time Medical Officers, Visiting
              Specialists and Para Medical staff. The Director has also
              constituted a Hospital Advisory Committee with a Chairman
              nominated by him and members drawn from hospital and other
              recognized bodies of the Institute including student
              representatives, with the Head (Hospital Services) as the Member
              Secretary of the Committee.
            </Typography>
          </Container>

          {/* Login Form */}
          <Container maxWidth="sm" className="flex-grow mt-8 lg:mt-0">
            <LoginForm />
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomeBody;
