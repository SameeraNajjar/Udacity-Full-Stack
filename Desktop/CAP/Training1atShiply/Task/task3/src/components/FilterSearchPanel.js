import { Typography, TextField, Select, MenuItem, Paper, InputAdornment, Slider } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SortSharpIcon from '@mui/icons-material/SortSharp';

const FilterSearchPanel = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  maxPrice,
  packageTypeFilter,
  setPackageTypeFilter,
  phoneFilter,
  setPhoneFilter
}) => {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        <FilterAltOutlinedIcon sx={{ mr: 0.5, fontSize: '26px', mb: -0.7 }} />
        Filters & Search
      </Typography>

      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Search Packages
      </Typography>
      <TextField
        placeholder="Search by recipient or address"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        slots={{
          inputAdornment: InputAdornment,
        }}
        slotProps={{
          inputAdornment: {
            position: 'start',
            children: <SearchIcon sx={{ color: '#b1b5bfff' }} />,
          },
        }}
      />

      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Filter by Status
      </Typography>
      <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="All Statuses">All Statuses</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Transit">In Transit</MenuItem>
        <MenuItem value="Delivered">Delivered</MenuItem>
      </Select>

      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={maxPrice}
        sx={{ mb: 2, color: 'black' }}
      />
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Filter by Package Type
      </Typography>
      <Select
        value={packageTypeFilter}
        onChange={(e) => setPackageTypeFilter(e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="All Types">All Types</MenuItem>
        <MenuItem value="Envelope">Envelope</MenuItem>
        <MenuItem value="Small Box">Small Box</MenuItem>
        <MenuItem value="Medium Box">Medium Box</MenuItem>
        <MenuItem value="Large Box">Large Box</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Filter by Phone Number
      </Typography>
      <TextField
        placeholder="Search by phone"
        size="small"
        fullWidth
        value={phoneFilter}
        onChange={(e) => setPhoneFilter(e.target.value)}
        sx={{ mb: 2 }}
        // slots defines what components to use (e.g., InputAdornment).
        // slotProps passes props to those components, including the position and children (the icon).
        slots={{
          inputAdornment: InputAdornment,
        }}
        slotProps={{
          inputAdornment: {
            position: 'start',
            children: <SearchIcon sx={{ color: '#b1b5bfff' }} />,
          },
        }}
      />

      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        <SortSharpIcon sx={{ mr: 0.5, fontSize: '18px' }} />
        Sort by
      </Typography>
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        size="small"
        fullWidth
      >
        <MenuItem value="Date Created (Newest)">Date Created (Newest)</MenuItem>
        <MenuItem value="Date Created (Oldest)">Date Created (Oldest)</MenuItem>
      </Select>
    </Paper>
  );
};

export default FilterSearchPanel;
