import { Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const QuickActions = ({ onAddPackage }) => {
  return (
    <Paper elevation={0} sx={{ height: 100, p: 3, border: '1px solid #e5e7eb', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Quick Actions
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        fullWidth
        sx={{ mt: 1, bgcolor: '#111827', textTransform: 'none', '&:hover': { bgcolor: '#1f2937' }, mb: -8, }}
        onClick={onAddPackage}
      >
        Add Package
      </Button>
    </Paper>
  );
};

export default QuickActions;
