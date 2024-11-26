import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Card,
  CardContent,
  useTheme,
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
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AddDay() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [days, setDays] = useState<Day[]>([]);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const theme = useTheme();
  const [plotData, setPlotData] = useState([
    { name: "Protein", value: 0 },
    { name: "Fats", value: 0 },
    { name: "Carbohydrates", value: 0 },
  ]);
  // const [refreshPlot, setRefreshPlot] = useState(false)
  const COLORS = ["#FF6384", "#FFCE56", "#36A2EB"];

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
      setDays([...response.data]);
      if (selectedDay) {
        const updatedSelectedDay = response.data.find(
          (day: Day) => day.id === selectedDay.id,
        );

        setSelectedDay(updatedSelectedDay || null);
        setPlotData([
          { name: "Protein", value: updatedSelectedDay.total_protein },
          { name: "Fats", value: updatedSelectedDay.total_fat },
          {
            name: "Carbohydrates",
            value: updatedSelectedDay.total_carbohydrates,
          },
        ]);
      }
    } catch (error) {
      console.error("Error while fetching days:", error);
    }
  };

  const handleSelectDay = (day: Day) => {
    setSelectedDay(day);
    setPlotData([
      { name: "Protein", value: day.total_protein },
      { name: "Fats", value: day.total_fat },
      { name: "Carbohydrates", value: day.total_carbohydrates },
    ]);
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
          flexDirection: "column",
          gap: 4,
          border: 2,
          borderColor: `${theme.palette.primary.main}`,
          borderRadius: 6,
          padding: 8,
          minWidth: "95%",
          scrollPadding: 0,
        }}
      >
        <List
          component={Box}
          display={"grid"}
          gridTemplateColumns="repeat(8, 1fr)"
          gap={2}
        >
          {days.map((day) => (
            <ListItem
              key={day.id}
              onClick={() => handleSelectDay(day)}
              sx={{
                border:
                  selectedDay?.id === day.id
                    ? `2px solid ${theme.palette.primary.main}`
                    : "2px solid transparent",
                borderRadius: "8px",
                marginBottom: 1,
                transition: "border-color 0.3s ease",
                cursor: "pointer",
              }}
            >
              <ListItemText
                primary={`Date: ${dayjs(day.date).format("MM-DD-YYYY")}`}
                secondary={`Calories: ${day.total_calories}`}
              />
            </ListItem>
          ))}
        </List>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              marginTop={5}
            >
              <Box display="flex" flexDirection="column" gap={2} width={"15%"}>
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

              {selectedDay != null && (
                <>
                  <Card
                    component={Box}
                    width={"45%"}
                    sx={{
                      backgroundColor: theme.palette.background.default,
                      boxShadow: "none",
                      marginLeft: 3,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        Details for{" "}
                        {dayjs(selectedDay.date).format("MM-DD-YYYY")}
                      </Typography>
                      <Typography>
                        Total Calories: {selectedDay.total_calories}
                      </Typography>
                      <Typography>
                        Protein: {selectedDay.total_protein}, Carbohydrates:{" "}
                        {selectedDay.total_carbohydrates}, Fat:{" "}
                        {selectedDay.total_fat}
                      </Typography>
                      <Meals dayId={selectedDay.id} fetchDays={fetchDays} />
                    </CardContent>
                  </Card>
                  <Box
                    width={"40%"}
                    display={"flex"}
                    justifyContent={"center"}
                    height={500}
                  >
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                      <PieChart width={600} height={600}>
                        <Pie
                          data={plotData}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          label={({ name, value }) => `${name}: ${value}g`}
                          fill="#8884d8"
                          labelLine={true}
                          isAnimationActive={true}
                          animationDuration={800}
                          animationBegin={0}
                        >
                          {plotData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip></Tooltip>
                        <Legend></Legend>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </>
              )}
            </Box>
          </DemoContainer>
        </LocalizationProvider>
      </Container>
    </SnackbarProvider>
  );
}
