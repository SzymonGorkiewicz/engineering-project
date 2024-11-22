import { Box, Button, Card, CardContent, Container, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { bodyStats } from "./types"
import axios from "axios"
import {  DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ConfirmDeleteDialog from "./deletePopup"
import EditDialog from "./editPopup"
// NIE DZIALA PRZEKAZYWNANIE STATYSTYK
const BodyStats : React.FC = () =>{
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const [statistics, setStatistics] = useState<bodyStats[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [date, setSelectedDate] = useState<Date|undefined>(new Date())
    const [bodyStatForm, setBodyStatForm] = useState<bodyStats>({
        date: new Date(),
        weight: 0,
        chest_circ: 0,
        waist_circ: 0,
        id:0})
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [currentStatID, setCurrentStatID] = useState<number|null>(null);



    const fetchBodyStatistics = async () => {
        try{
            const response = await axios.get(`${backendURL}body-stats`,{withCredentials:true})
            setBodyStatForm({
                date: new Date(),
                weight: 0,
                chest_circ: 0,
                waist_circ: 0,
                id: 0
            });
            setStatistics(response.data)
        }catch(error){
            // setErrorMessage(error.error.)
            console.error(error)
        }
    }

    const handleSubmit = async (event: React.FormEvent) =>{
        event.preventDefault();
        try {
            await axios.post(`${backendURL}body-stats`, bodyStatForm, {withCredentials:true})
            fetchBodyStatistics()
        }catch(error){
            setErrorMessage("Couldnt add data")
        }
    }

    useEffect(()=>{
        fetchBodyStatistics()
    },[])

    const handleInputChange = (field: keyof bodyStats, value: string | number | Date) => {
        setBodyStatForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return <>
        <Container>
            <Box component={"form"} onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Callendar" 
                    value={dayjs(date)}
                    onChange={(newValue)=> setSelectedDate(newValue?.toDate())}/>
                </LocalizationProvider>
                <TextField
                type="number"
                value={bodyStatForm.weight}
                onChange={(e) => handleInputChange("weight", Number(e.target.value))}
                required
                
                />
                <TextField
                type="number"
                value={bodyStatForm.chest_circ}
                onChange={(e) => handleInputChange("chest_circ", Number(e.target.value))}
                required
                />
                <TextField
                type="number"
                value={bodyStatForm.waist_circ}
                onChange={(e) => handleInputChange("waist_circ", Number(e.target.value))}
                required
                />
                <Button variant="contained" type="submit">Add</Button>
            </Box>
            <Box sx= {{marginTop: 5}}>
                <Grid container spacing={2}>
                    {statistics.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined">
                        <CardContent >
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                    Statistic {index + 1}
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Weight:</strong> {stat.weight} kg
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Chest circuit:</strong> {stat.chest_circ} cm
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Waist circuit:</strong> {stat.waist_circ} cm
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Date:</strong> {dayjs(stat.date).format("MM-DD-YYYY")}
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap:3}}>
                                    <IconButton onClick={()=>{setDeleteDialogOpen(true); setCurrentStatID(stat.id)}}>
                                        <DeleteOutlineOutlinedIcon/>    
                                    </IconButton>
                                    <IconButton onClick={()=>{setEditDialogOpen(true); setCurrentStatID(stat.id)}}>
                                        <EditOutlinedIcon/>   
                                    </IconButton>   
                                </Box>
                            </Box>
                        </CardContent>
                        </Card>
                        {currentStatID && (
                            <>
                                <ConfirmDeleteDialog open={isDeleteDialogOpen} onClose={()=>setDeleteDialogOpen(false)} id={currentStatID}  fetchBodyStatistics={fetchBodyStatistics}/>
                                <EditDialog open={isEditDialogOpen} onClose={()=>setEditDialogOpen(false)} id={currentStatID} fetchBodyStatistics={fetchBodyStatistics}/>
                            </>
                        )}
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
       
    
    </>

}

export default BodyStats