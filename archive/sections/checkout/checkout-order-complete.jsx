import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { m, AnimatePresence } from 'framer-motion';

import { useTranslate } from 'src/locales'; // Assuming you have a hook for translation
import Iconify from 'src/components/iconify';
import { varFade } from 'src/components/animate';
import { OrderCompleteIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ open, onReset, onDownloadPDF }) {
  const { t } = useTranslate();

  const renderContent = (
    <Stack
      spacing={5}
      sx={{
        m: 'auto',
        maxWidth: 480,
        textAlign: 'center',
        px: { xs: 2, sm: 0 },
        py: 10,
      }}
    >
      <Typography variant="h4">{t('thankYouForPurchase')}</Typography>

      <OrderCompleteIllustration sx={{ height: 260 }} />

      <Typography>
        {t('thanksForPlacingOrder')}
        <br />
        <Link>#2564</Link>
        <br />
        {t('notificationSentWithinDays')}
        <br /> {t('contactUsForQuestions')} <br /> <br />
        {t('allTheBest')}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        justifyContent="space-between"
        direction={{ xs: 'column-reverse', sm: 'row' }}
      >
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={onReset}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          {t('seeYourPlan')}
        </Button>

        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-download-fill" />}
          onClick={onDownloadPDF}
        >
          {t('downloadAsPDF')}
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          fullScreen
          open={open}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              {...varFade({
                distance: 120,
                durationIn: 0.32,
                durationOut: 0.24,
                easeIn: 'easeInOut',
              }).inUp}
              sx={{
                width: 1,
                height: 1,
                p: { md: 3 },
              }}
            >
              <Paper {...props}>{props.children}</Paper>
            </Box>
          )}
        >
          {renderContent}
        </Dialog>
      )}
    </AnimatePresence>
  );
}

CheckoutOrderComplete.propTypes = {
  open: PropTypes.bool,
  onReset: PropTypes.func,
  children: PropTypes.node,
  onDownloadPDF: PropTypes.func,
};
