import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Container,
} from "@mui/material";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./HomeBody.css";

const HomeBody = () => {
  const news = [
    {
      title: "Doctor A on duty",
      description: "Doctor A will be on duty this weekend.",
    },
    {
      title: "New Duty Schedule",
      description: "The new duty schedule for July has been released.",
    },
    {
      title: "Emergency Contact",
      description: "In case of emergency, contact the hospital administration.",
    },
  ];

  return (
    <>
      <div className="flex flex-row ">
        {/* Left Container */}
        <Container>
          <Paper elevation={3} style={{ padding: "16px", marginTop: "4rem" }}>
            <marquee>Duty Doctors News</marquee>
            <List>
              {news.map((item, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={item.title}
                      secondary={item.description}
                    />
                  </ListItem>
                  {index < news.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Paper>
        </Container>

        {/* Carousel Container */}
        <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
          <h1 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            About RGUKT Hospital
          </h1>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
              <img
                src="https://www.rgukt.ac.in/assets/images/rgukt/hospital.jpg"
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                src="https://data1.ibtimes.co.in/en/full/773945/probe-ordered-into-food-poisoning-telanganas-iiit-basara.jpg?h=450&l=50&t=40"
                alt="Slide 2"
              />
            </div>
            <div>
              <img
                src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202207/Collage_Maker-15-Jul-2022-09.4_1200x768.jpeg?VersionId=OC0p_ktmEpFOkJrQy9.WIA4riPFiIz4p&size=690:388"
                alt="Slide 3"
              />
            </div>
          </Carousel>
          <p>
            The multifarious medical needs of the Campus population consisting
            of Students, Staff members and their families are met by the
            Institute Hospital. The Hospital is headed by the Head (Hospital
            Services) with a team of full time Medical Officers, Visiting
            Specialists and Para Medical staff. The Director has also
            constituted a Hospital Advisory Committee with a Chairman nominated
            by him and members drawn from hospital and other recognized bodies
            of the Institute including student representatives, with the Head
            (Hospital Services) as the Member Secretary of the Committee. This
            Committee formulates various policies for providing medical
            facilities to the Campus population.
          </p>
        </Container>

        {/* Right Container */}
        <Container maxWidth="sm" style={{ marginTop: "4rem" }}>
          <Paper elevation={2} style={{ padding: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Important Numbers
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Emergency" secondary="911" />
                <ListItemText primary="Ambulance" secondary="911" />
              </ListItem>
            </List>
          </Paper>
        </Container>
      </div>

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
    </>
  );
};

export default HomeBody;
