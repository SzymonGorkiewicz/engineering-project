"use client";
import DefaultNavBar from "./_components/defaultNavBar";

import { Box, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <DefaultNavBar></DefaultNavBar>
      <Container>
        <Box
          display="flex"
          minHeight="60vh"
          bgcolor="background.default"
          color="text.primary"
          gap={10}
        >
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={4}
            bgcolor="primary.main"
            color="white"
            borderRadius={12}
          >
            <Typography variant="h2" gutterBottom>
              Welcome to the LifeTrack
            </Typography>
            <Typography variant="body1" textAlign="center" mb={4}>
              Track your meals, monitor your weight, and stay healthy with our
              app.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/homepage"
              sx={{ bgcolor: "secondary.main", color: "text.primary" }}
            >
              Go to Homepage
            </Button>
          </Box>

          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={4}
            bgcolor="primary.main"
            color="white"
            borderRadius={12}
          >
            <Typography variant="h2" gutterBottom>
              View Your Statistics
            </Typography>
            <Typography variant="body1" textAlign="center" mb={4}>
              Get insights into your calorie intake and progress over time.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/statistics"
              sx={{ bgcolor: "secondary.main", color: "text.primary" }}
            >
              Go to Statistics
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
