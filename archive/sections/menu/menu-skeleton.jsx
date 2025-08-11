import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export function HomeSkeleton() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Container sx={{ mt: { xs: 4, md: 8 } }}>
      <Stack>
        <Grid container spacing={2}>
          {[...Array(20)].map((_, index) => (
            <Grid key={index} xs={6} md={3}>
              <Skeleton height={mdUp ? 200 : 150} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
