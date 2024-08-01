import React, { useState } from 'react';
import { useMyContext } from 'src/sections/myProvider';
import axios from 'axios';
import { Modal, Box, Button, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PopupForm = ({ isVisible, onClose }) => {
  const { data, setData } = useMyContext();
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(''); // Added state for amount
  const [category, setCategory] = useState(''); // Added state for category
  const [description, setDescription] = useState(''); // Added state for description

  if (!isVisible) {
    return null;
  }
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Log the form data to the console
    // console.log('Form Data:', {
    //   amount,
    //   type,
    //   category: type === 'true' ? category : 'N/A', // Only log category if type is 'true'
    //   description,
    // });

    axios.post('http://localhost:8000/add_expense', { 
      amount: Number(amount), 
      is_expense: type.toLowerCase() === "true", 
      catagory:category, 
      description 
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
      .then(response => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    onClose(); // Close the form after submission
  };

  return (
    <Modal open={isVisible} onClose={onClose}>
      <Box sx={styles.overlay}>
        <Box sx={styles.popup}>
          <Typography variant="h6">Add Transaction</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="amount">Amount</InputLabel>
              <TextField
                id="amount"
                type="number"
                name="amount"
                variant="outlined"
                fullWidth
                value={amount} // Controlled value
                onChange={handleAmountChange} // Update state on change
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select
                id="type"
                name="type"
                value={type}
                onChange={handleTypeChange}
                label="Type"
                fullWidth
              >
                <MenuItem value="false">Income</MenuItem>
                <MenuItem value="true">Expense</MenuItem>
              </Select>
            </FormControl>

            {type === 'true' && (
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="category">Category</InputLabel>
                <TextField
                  id="category"
                  name="category"
                  variant="outlined"
                  fullWidth
                  value={category} // Controlled value
                  onChange={handleCategoryChange} // Update state on change
                />
              </FormControl>
            )}

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                id="description"
                name="description"
                variant="outlined"
                fullWidth
                value={description} // Controlled value
                onChange={handleDescriptionChange} // Update state on change
              />
            </FormControl>

            <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
              Submit
            </Button>
            <Button type="button" onClick={onClose} variant="outlined">
              Close
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
  },
};

export default PopupForm;
