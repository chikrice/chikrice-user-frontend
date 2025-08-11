import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { usePathname, useRouter } from 'src/routes/hooks';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

// ----------------------------------------------------------------------

export default function StepperLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isSteps = pathname === '/steps';

  return (
    <>
      <Box component="main">
        {!isSteps && (
          <Box width={'100%'} sx={{ display: 'flex', py: 2 }}>
            <LeftIcon onClick={() => router.back()} width={30} sx={{ cursor: 'pointer' }} />
          </Box>
        )}
        <Box>{children}</Box>
      </Box>
    </>
  );
}

StepperLayout.propTypes = {
  children: PropTypes.node,
};
