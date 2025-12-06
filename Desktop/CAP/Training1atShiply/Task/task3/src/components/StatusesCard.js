import { Box, Stack, Typography } from "@mui/material";

const StatusesCard = ({ status, index }) => {

  return (
    <Stack direction="row" spacing={2} mt={4}>
      <Box
        key={index}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, border: '1px solid #e5e7eb', borderRadius: 2, px: 2, height: 80, backgroundColor: '#fff', minWidth: 200, }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: status.bgColor, borderRadius: 2, p: 1.2, }} >
          {status.icon}
        </Box>
        <Stack spacing={0}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
            {status.label}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {status.count}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
export default StatusesCard;
