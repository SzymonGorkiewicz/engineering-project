import React, { useState, useEffect } from "react";
import { Button, Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import dayjs, { Dayjs } from 'dayjs';

type Day = {
    id:number
    date: Date,
    total_protein: string,
    total_carbohydrates:string,
    total_fat:string
}

export default function AddDay() {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const [selectedDate, setSelectedDate] = useState<Dayjs|null>(dayjs());
    const [days, setDays] = useState<Day[]>([]);

    const handleAddDay = async () => {
        //console.log(selectedDate.format("YYYY-MM-DD"))
        if (selectedDate) {
            try {
                await axios.post(`${backendURL}days`, { date: selectedDate.format("YYYY-MM-DD") }, {
                    withCredentials:true
                  } );
                console.log("Dzień utworzony:", selectedDate);
                fetchDays()
            } catch (error) {
                console.error("Błąd przy tworzeniu dnia:", error);
            }
        }
    };

    const fetchDays = async () => {
        try {
            const response = await axios.get(`${backendURL}days`, {
                params: { range: 7 },
                withCredentials: true 
            });
            setDays(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Błąd przy pobieraniu dni:", error);
        }
    };

    const today = dayjs();
    const minDate = today.subtract(7, 'day');  
    const maxDate = today.add(7, 'day');      

    useEffect(() => {
        fetchDays();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                label="Callendar" 
                defaultValue={dayjs()}
                value={selectedDate}
                onChange={(newValue)=> setSelectedDate(newValue)}
                minDate={minDate}
                maxDate={maxDate}
                />
                <Button variant="contained" onClick={handleAddDay}>
                Add Day
                </Button>
                <Box mt={3}>
                    <Typography variant="h6">Days:</Typography>
                    <List>
                        {days.map((day) => (
                            <ListItem key={day.id}>
                                <ListItemText
                                    primary={`Date: ${dayjs(day.date).format("MM-DD-YYYY")}`}
                                    secondary={`Protein: ${day.total_protein}, Carbs: ${day.total_carbohydrates}, Fat: ${day.total_fat}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </DemoContainer>
        </LocalizationProvider>
    );
}
