import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Switch, FormControlLabel,
} from '@mui/material';
import PackageAppBar from '../components/PackageAppBar';
import { useNavigate } from 'react-router-dom';

const AddPackage = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('');
  const [packageType, setPackageType] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');


  const handleClear = () => {
    setRecipient('');
    setDeliveryDate('');
    setAddress('');
    setNotes('');
    setPrice('');
    setPackageType('');
    setPhone('');
    setErrors({});
  };

  const handleSave = () => {
    const newErrors = {};

    if (!recipient.trim()) newErrors.recipient = 'The recipient must be filled';
    if (!address.trim()) newErrors.address = 'The address must be filled';
    if (!phone.trim()) newErrors.phone = 'The phone number must be filled';
    if (!packageType.trim()) newErrors.packageType = 'The package type must be selected';
    if (isScheduled) {
      if (!scheduledDate.trim()) newErrors.scheduledDate = 'Scheduled date is required';
      if (!scheduledTime.trim()) newErrors.scheduledTime = 'Scheduled time is required';
    }
    if (!price.trim()) {
      newErrors.price = 'The price must be filled';
    } else if (isNaN(price)) {
      newErrors.price = 'Price must be a valid number greater than 0';
    } else if (Number(price) <= 0) {
      newErrors.price = 'Price must be a valid number greater than 0';
    } else if (Number(price) > 5000) {
      newErrors.price = 'Cannot accept package price more than 5000 ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPackage = {
      id: Date.now(),
      recipient,
      deliveryDate,
      scheduledDate: isScheduled ? scheduledDate : null,
      scheduledTime: isScheduled ? scheduledTime : null,
      isScheduled,
      address,
      notes,
      price: Number(price),
      packageType,
      phone,
      status: 'Pending',
      createdDate: new Date().toISOString().split('T')[0],
    };

    const stored = localStorage.getItem('packages');
    const packages = stored ? JSON.parse(stored) : [];
    const updated = [...packages, newPackage];
    localStorage.setItem('packages', JSON.stringify(updated));

    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <PackageAppBar />
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          px: 3,
          py: 5,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
          mt: 10,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Add New Package
        </Typography>

        <Stack direction="row" spacing={4}>
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
              Recipient Name *
            </Typography>
            <TextField
              fullWidth
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient name"
              error={!!errors.recipient}
              helperText={errors.recipient}
            />
          </Box>

          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
              Delivery Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              error={!!errors.deliveryDate}
              helperText={errors.deliveryDate}
            />
          </Box>
        </Stack>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
          Delivery Address *
        </Typography>
        <TextField
          value={address}
          placeholder="Enter full delivery address"
          fullWidth
          multiline
          rows={2}
          onChange={(e) => setAddress(e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
        />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
          Phone Number *
        </Typography>
        <TextField
          fullWidth
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter recipient phone number"
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
          Package Type *
        </Typography>
        <TextField
          fullWidth
          select
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
          error={!!errors.packageType}
          helperText={errors.packageType}
        >
          <MenuItem value="Envelope">Envelope</MenuItem>
          <MenuItem value="Small Box">Small Box</MenuItem>
          <MenuItem value="Medium Box">Medium Box</MenuItem>
          <MenuItem value="Large Box">Large Box</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
          Package Price *
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          error={!!errors.price}
          helperText={errors.price}
        />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
          Scheduled Delivery?
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
              color="primary"
            />
          }
          label="Scheduled Delivery?"
          sx={{ mt: 2 }}
        />
        {isScheduled && (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              error={!!errors.scheduledDate}
              helperText={errors.scheduledDate}
            />

            <TextField
              fullWidth
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              error={!!errors.scheduledTime}
              helperText={errors.scheduledTime}
            />
          </Stack>
        )}

        <Typography variant="subtitle1" fontWeight="bold" sx={{ p: 1 }}>
          Delivery Notes
        </Typography>
        <TextField
          value={notes}
          fullWidth
          multiline
          rows={2}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Special instructions, access codes, etc. (optional)"
        />


        <Stack direction="row" spacing={2} paddingTop={3}>
          <Button
            sx={{
              p: '10px 18px',
              bgcolor: '#000',
              color: '#fff',
              borderRadius: '6px',
              textTransform: 'none',
            }}
            onClick={handleSave}
          >
            Add Package
          </Button>
          <Button
            sx={{
              p: '10px 18px',
              bgcolor: '#fff',
              color: '#000',
              border: '1px solid #ccc',
              borderRadius: '6px',
              textTransform: 'none',
            }}
            onClick={handleClear}
          >
            Clear Form
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddPackage;
