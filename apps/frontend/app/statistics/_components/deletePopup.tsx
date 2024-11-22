import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import axios from 'axios';

type DeleteDialogProps = {
    open: boolean;
    onClose: ()=>void;
    id:number|null
    fetchBodyStatistics: () => void;
};

const ConfirmDeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, id, fetchBodyStatistics  }) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleConfirm = async () => {
        await axios.delete(`${backendURL}body-stats/${id}`, {withCredentials: true})
        fetchBodyStatistics();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete confirmation</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Are you sure you want to delete?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
            Cancel
            </Button>
            <Button onClick={handleConfirm} color="error" variant="contained">
            Delete
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
