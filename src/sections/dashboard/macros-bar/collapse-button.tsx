import { IconButton, Stack } from '@mui/material';

import Iconify from 'src/components/iconify';

// -------------------------------------
interface MacrosBarCollapseBtn {
  isIn: boolean;
  onClick: () => void;
}
export function MacrosBarCollapseBtn({ isIn, onClick }: MacrosBarCollapseBtn) {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
      }}
    >
      <IconButton color="primary" onClick={onClick}>
        <Iconify icon={isIn ? 'icon-park-outline:up' : 'icon-park-outline:down'} />
      </IconButton>
    </Stack>
  );
}
