import { Button, Stack, Typography } from '@mui/material';

export default function ReloadPage() {
  return (
    <Stack sx={{ mt: '40svh', px: 3, textAlign: 'center' }} spacing={2}>
      <Typography variant="body1">There was a problem fetching your data</Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Reload App
      </Button>
    </Stack>
  );
}
