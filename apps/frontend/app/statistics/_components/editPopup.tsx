import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { bodyStats } from './types';
import axios from 'axios';

type EditDialogProps = {
    open: boolean;
    onClose: ()=>void;
    statistics: bodyStats;
    fetchBodyStatistics: () => void;
};


const EditDialog : React.FC<EditDialogProps> = ({ open, onClose, statistics, fetchBodyStatistics }) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [formData, setFormData] = useState<bodyStats>({
        id: statistics.id,
        date: statistics.date,
        weight: statistics.weight,
        chest_circ: statistics.chest_circ,
        waist_circ: statistics.waist_circ,
        });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight' || name === 'chest_circ' || name === 'waist_circ' ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    try {
        await axios.patch(`${backendURL}body-stats/${formData.id}`, formData, { withCredentials: true });
        fetchBodyStatistics();  
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
                value={formData.weight}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                />
            <TextField
                label="Chest Circumference"
                name="chest_circ"
                value={formData.chest_circ}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                />
            <TextField
                label="Waist Circumference"
                name="waist_circ"
                value={formData.waist_circ}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                />
            <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                />
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
