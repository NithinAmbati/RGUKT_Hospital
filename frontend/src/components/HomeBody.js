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

import LoginForm from "./LoginForm";
import "../css/HomeBody.css";

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
  ];

  return (
    <>
      <div className="mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="mt-16 flex flex-col flex-grow gap-14">
            {/* News Section */}
            <Container maxWidth="sm">
              <Paper elevation={3} style={{ padding: "16px" }}>
                <div className="marquee-container">
                  <div className="marquee-content">Duty Doctors News</div>
                </div>
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

            {/* Important Numbers Section */}
            <Container maxWidth="sm">
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography className="text-center" variant="h6" gutterBottom>
                  Important Numbers
                </Typography>
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
              Secretary of the Committee. This Committee formulates various
              policies for providing medical facilities to the Campus
              population.
            </Typography>
          </Container>

          {/* Login Form Section */}
          <Container maxWidth="sm" className="flex-grow mt-8 lg:mt-0">
            <LoginForm />
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomeBody;
