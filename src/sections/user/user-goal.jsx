import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  Divider,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

export default function UserGoal({ user }) {
  const { t } = useTranslate();

  const [isChangeGoal, setIsChangeGoal] = useState(false);

  const defaultValues = useMemo(
    () => ({
      currentWeight: user?.currentWeight,
      targetWeight: user?.targetWeight,
    }),
    [user]
  );

  const changeGoalSchema = Yup.object().shape({
    currentWeight: Yup.number().required(t('currentWeightRequried')),
    targetWeight: Yup.number().required(t('targetWeightRequried')),
  });

  const methods = useForm({
    resolver: yupResolver(changeGoalSchema),
    defaultValues,
  });

  const {
    // watch,
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    // perform 2 api calls
    // 1. to update user with currentWeight, targetWeight
    // 2. to update user roadmap with currentWeight, targetWeight
  });

  return (
    <>
      <Stack mt={2}>
        <Typography variant="h4" mb={1} mx={1}>
          {t('goal')}
        </Typography>
        <Card
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.customShadows.card,
            py: 1,
            px: 2,
          }}
        >
          <List sx={{ color: 'text.secondary' }}>
            <ListItem>
              <ListItemIcon>
                <Radio color="error" checked={true} />
              </ListItemIcon>
              <ListItemText primary={t('startWeight')} />
              <Label>{user?.startWeight}kg</Label>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Radio color="info" checked={true} />
              </ListItemIcon>
              <ListItemText primary={t('currentWeight')} />
              <Label>{user?.currentWeight}kg</Label>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Radio color="success" checked={true} />
              </ListItemIcon>
              <ListItemText primary={t('targetWeight')} />
              <Label>{user?.targetWeight}kg</Label>
            </ListItem>
          </List>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{ mb: 1 }}
            onClick={() => setIsChangeGoal(true)}
          >
            {t('change')}
          </Button>
        </Card>
      </Stack>

      <Dialog fullWidth maxWidth="xs" open={isChangeGoal} onClose={() => setIsChangeGoal(false)}>
        <DialogTitle>
          <Alert variant="outlined" severity="info">
            {t('goalChangingWarnning')} ?
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign={'center'} fontSize={'small'}>
            {t('goalChaingingText')}
          </DialogContentText>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing={2} mt={2}>
              <RHFTextField
                name="currentWeight"
                type={'number'}
                label={t('currentWeight')}
                placeholder={t('weightPlaceholder')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Iconify icon={'healthicons:weight'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="targetWeight"
                type={'number'}
                label={t('targetWeight')}
                placeholder={t('weightPlaceholder')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Iconify icon={'mdi:weight-lifter'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={() => setIsChangeGoal(false)}>
            {t('cancel')}
          </Button>
          <LoadingButton
            loading={isSubmitting}
            onClick={onSubmit}
            color="inherit"
            variant="contained"
          >
            {t('confirm')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserGoal.propTypes = {
  user: PropTypes.object,
};
