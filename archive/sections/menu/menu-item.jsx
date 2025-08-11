import { Box, Card, Divider, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import Label from 'src/components/label';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import imgUrl from 'src/assets/images/salad-1.png';

export default function MenuItem() {
  const router = useRouter();

  return (
    <Card
      sx={{
        pt: 2.5,
        pr: 2,
        pl: 4.5,
        pb: 3,
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.customShadows.card,
      }}
      onClick={() => router.push(paths.meal('1'))}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          pr: 1,
        }}
      >
        <Box>
          <Typography variant="h4">سلطة الكينوا والأفوكادو</Typography>
          <Typography variant="body2" color={'text.secondary'}>
            Quinoa Avocado Salad
          </Typography>
        </Box>

        <Iconify color="text.secondary" icon={'fluent:open-12-regular'} sx={{ mt: 0.5 }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <Stack sx={{ width: '50%', mt: 2 }} spacing={0.2}>
          {/* cal */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <small>Calories</small>
            <Label variant="ghost">200</Label>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* cab */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <small>Carbs</small>
            <Label variant="ghost">200</Label>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* pro */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <small>Pro</small>
            <Label variant="ghost">200</Label>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* fat */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <small>Fat</small>
            <Label variant="ghost">200</Label>
          </Box>
        </Stack>

        <Image
          src={imgUrl}
          alt={'meal'}
          sx={{
            width: '40%',
            minHeight: '100px',
            borderRadius: 2,
            ratio: '1/1',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '0',
          }}
        />
      </Box>
    </Card>
  );
}
