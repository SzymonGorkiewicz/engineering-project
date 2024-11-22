import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { bodyStats } from "./types";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type EditDialogProps = {
  open: boolean;
  onClose: () => void;
  id: number | null;
  fetchBodyStatistics: () => void;
};

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  id,
  fetchBodyStatistics,
}) => {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState<bodyStats>({
    id: null,
    date: new Date(),
    weight: 0,
    chest_circ: 0,
    waist_circ: 0,
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const fetchOneBodyStat = async () => {
    try {
      const respone = await axios.get(`${backendURL}body-stats/${id}`, {
        withCredentials: true,
      });
      setFormData(respone.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOneBodyStat();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "weight" || name === "chest_circ" || name === "waist_circ"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...formData };

      if (selectedDate) {
        const dateToSend = selectedDate.add(1, "hour").toDate();
        updatedData.date = dateToSend;
      }

      await axios.patch(`${backendURL}body-stats/${formData.id}`, updatedData, {
        withCredentials: true,
      });
      fetchBodyStatistics();
      fetchOneBodyStat();
      onClose();
    } catch (error) {
      console.error("Error saving updated data:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edytuj element</DialogTitle>
      <DialogContent>
        <TextField
          label="Weight"
          name="weight"
          value={formData.weight === 0 ? "" : formData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Chest Circumference"
          name="chest_circ"
          value={formData.chest_circ === 0 ? "" : formData.chest_circ}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Waist Circumference"
          name="waist_circ"
          value={formData.waist_circ === 0 ? "" : formData.waist_circ}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Callendar"
              value={dayjs(formData.date)}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
