import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Container,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import Meals from "./get_meals";
import { Day } from "./types";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ClearIcon from "@mui/icons-material/Clear";

export default function AddDay() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [days, setDays] = useState<Day[]>([]);
  const [expandedDayId, setExpandedDayId] = useState<number | null>(null);

  const handleAddDay = async () => {
    if (selectedDate) {
      try {
        await axios.post(
          `${backendURL}days`,
          { date: selectedDate.format("YYYY-MM-DD") },
          {
            withCredentials: true,
          },
        );
        fetchDays();
        enqueueSnackbar(
          `Day ${selectedDate.format("MM-DD-YYYY")} succesfully created`,
          {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          },
        );
      } catch (error) {
        console.error(error);
        enqueueSnackbar(
          `Day ${selectedDate.format("MM-DD-YYYY")} is already created`,
          {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          },
        );
      }
    }
  };

  const fetchDays = async () => {
    try {
      const response = await axios.get(`${backendURL}days`, {
        params: { range: 7 },
        withCredentials: true,
      });
      setDays(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching days:", error);
    }
  };

  const handleToggleExpand = (dayId: number) => {
    setExpandedDayId(expandedDayId === dayId ? null : dayId);
  };

  const today = dayjs();
  const minDate = today.subtract(7, "day");
  const maxDate = today.add(7, "day");

  useEffect(() => {
    fetchDays();
  }, []);

  return (
    <SnackbarProvider preventDuplicate autoHideDuration={3000}>
      <Container
        sx={{
          display: "flex",
          border: 1,
          borderColor: "gray",
          borderRadius: 6,
          padding: 5,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <Box display={"flex"} flexDirection={"row"} gap={10}>
              <Box display={"flex"} flexDirection={"column"}>
                <DatePicker
                  label="Callendar"
                  defaultValue={dayjs()}
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={minDate}
                  maxDate={maxDate}
                />
                <Button variant="contained" onClick={handleAddDay}>
                  Add Day
                </Button>
              </Box>
              <Box>
                <Typography variant="h6">Days:</Typography>
                <List>
                  {days.map((day) => (
                    <Box key={day.id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <ListItem
                          onClick={() => handleToggleExpand(day.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <ListItemText
                            primary={`Date: ${dayjs(day.date).format("MM-DD-YYYY")} - Calories: ${day.total_calories}`}
                            secondary={`Protein: ${day.total_protein}, Carbohydrates: ${day.total_carbohydrates}, Fat: ${day.total_fat}`}
                          />
                        </ListItem>
                        <ClearIcon />
                      </Box>
                      <Collapse
                        in={expandedDayId === day.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box ml={4}>
                          <Meals dayId={day.id} fetchDays={fetchDays} />
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                </List>
              </Box>
            </Box>
          </DemoContainer>
        </LocalizationProvider>
      </Container>
    </SnackbarProvider>
  );
}
