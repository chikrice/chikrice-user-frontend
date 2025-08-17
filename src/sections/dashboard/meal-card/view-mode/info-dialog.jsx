import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Dialog,
  DialogContent,
  Divider,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material';

import { useLocales, useTranslate } from 'src/locales';

export default function InfoDialog({ open, onClose, macros, ingredients }) {
  const { lang } = useLocales();
  const { t } = useTranslate();

  const renderMacrosItems = (macros) => (
    <>
      <small>
        {t('carb')} {macros.carb.toFixed(1)}g
      </small>
      <small>
        {t('pro')} {macros.pro.toFixed(1)}g
      </small>
      <small>
        {t('fat')} {macros.fat.toFixed(1)}g
      </small>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '100%',
          m: '16px',
        },
      }}
    >
      <Stack textAlign={'center'} py={2}>
        <Typography variant="h2" lineHeight={'2rem'}>
          {macros.cal.toFixed()}
        </Typography>
        <Typography variant="h5"> {t('calorie')}</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            gap: 3,
            fontWeight: '500',
          }}
        >
          {renderMacrosItems(macros)}
        </Stack>
      </Stack>
      <Divider style={{ borderStyle: 'dahsed' }} />
      <DialogContent sx={{ pt: 1, pb: 4 }}>
        <Stack spacing={1} alignItems={'center'}>
          {ingredients?.map((item, index) => (
            <Card key={index} sx={{ width: '100%', py: 1, pl: 2, background: 'transparent' }}>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2">{item.name[lang]}</Typography>

                  <Typography variant="body2">
                    ~ {item.portion.qty + ' ' + item.portion.label[lang]} (
                    {item.portion.weightInGrams}g)
                  </Typography>
                </Box>
              </ListItem>
              <Stack flexDirection={'row'} gap={3} color={'text.secondary'}>
                {renderMacrosItems(item.macros)}
              </Stack>
            </Card>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

InfoDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  macros: PropTypes.object,
  ingredients: PropTypes.array,
};
