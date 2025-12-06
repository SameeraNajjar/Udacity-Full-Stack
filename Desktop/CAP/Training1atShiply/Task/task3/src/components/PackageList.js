import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Chip, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotesIcon from '@mui/icons-material/Notes';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SosOutlinedIcon from '@mui/icons-material/SosOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
const PackageList = ({ packages, onStatusChange, statuses, onDelete }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', p: 1 }}>
        Packages ({packages.length})
      </Typography>

      <Stack spacing={2}>
        {packages.map((pkg, index) => {
          let statusData = statuses.find((s) => s.label === pkg.status);
          if (!statusData) statusData = { bgColor: '#fff', icon: null };
          const iconColor = statusData.icon?.props?.sx?.color || '#000';

          return (
            <Box
              key={index}
              sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#fff', boxShadow: 1, maxWidth: '100%', }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {pkg.recipient}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Chip
                    label={pkg.status}
                    icon={statusData.icon ? React.cloneElement(statusData.icon, { style: { color: iconColor } }) : null}
                    sx={{ color: iconColor, borderColor: iconColor, backgroundColor: statusData.bgColor, fontWeight: 'bold', }}
                    variant="outlined"
                    size="medium"
                  />
                  {(pkg.status === 'Pending' || pkg.status === 'In Transit') && (
                    <IconButton
                      onClick={(e) => {
                        setMenuAnchor(e.currentTarget);
                        setSelectedPackage(pkg.id);
                      }}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                  <Button
                    color="error"
                    onClick={() => onDelete(pkg.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </Stack>
              </Stack>

              <Stack direction="column" spacing={0.5} marginBottom={1} gap={1}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ color: 'grey' }}>
                    {pkg.address}
                  </Typography>
                </Stack>
                {pkg.deliveryDate &&
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <CalendarTodayIcon fontSize="small" />
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                      Delivery: {pkg.deliveryDate}
                    </Typography>
                  </Stack>
                }
                {pkg.notes &&
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <NotesIcon fontSize="small" />
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                      {pkg.notes || "No notes"}
                    </Typography>
                  </Stack>
                }
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <MonetizationOnOutlinedIcon />
                  <Typography variant="body2" sx={{ color: 'grey' }}>
                    {pkg.price || "Price not available"}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <SosOutlinedIcon />
                  <Typography variant="body2" sx={{ color: 'grey' }}>
                    {pkg.packageType}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <LocalPhoneOutlinedIcon />
                  <Typography variant="body2" sx={{ color: 'grey' }}>
                    {pkg.phone}
                  </Typography>
                </Stack>
                {pkg.isScheduled && 
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <PendingActionsOutlinedIcon />
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                      Scheduled for {pkg.scheduledDate} at {pkg.scheduledTime}
                    </Typography>
                  </Stack>
                }
              </Stack>

              <Divider sx={{ mb: 0.5 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ paddingTop: 2, color: 'grey', }}>
                  Created: {pkg.createdDate}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {pkg.status === 'Pending' && (
                    <Button
                      onClick={() => onStatusChange(pkg.id, 'In Transit')}
                      sx={{ p: '6px 8px', bgcolor: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '6px', textTransform: 'none' }}
                    >
                      Start Transit
                    </Button>
                  )}
                  {pkg.status !== 'Delivered' && (
                    <Button
                      onClick={() => onStatusChange(pkg.id, 'Delivered')}
                      sx={{ p: '6px 8px', bgcolor: '#000', color: '#fff', border: 'none', borderRadius: '6px', textTransform: 'none' }}
                    >
                      Mark Delivered
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Stack>

      {menuAnchor && (
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => {
            setMenuAnchor(null);
            setSelectedPackage(null);
          }}
        >
          {['Pending', 'In Transit', 'Delivered']
            .filter((status) => status !== packages.find((p) => p.id === selectedPackage)?.status)
            .map((status) => (
              <MenuItem
                key={status}
                onClick={() => {
                  onStatusChange(selectedPackage, status);
                  setMenuAnchor(null);
                  setSelectedPackage(null);
                }}
              >
                {status}
              </MenuItem>
            ))}
        </Menu>
      )}
    </Box>
  );
};
export default PackageList;