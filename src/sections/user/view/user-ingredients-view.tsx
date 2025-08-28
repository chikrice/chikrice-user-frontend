import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useState, useCallback } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  Divider,
  ListItem,
  ListItemIcon,
} from '@mui/material';

import useStore from 'src/store';
import Iconify from 'src/components/iconify';
import { api, endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import { useLocales, useTranslate } from 'src/locales';
import CircleButton from 'src/components/circle-button';
import { useUserIngredients } from 'src/api/ingredient';
import EmptyContent from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { ConfirmDialog, IngredientFormDialog } from 'src/components/custom-dialog';

export default function UserIngredientsView() {
  const { t } = useTranslate();
  const { lang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useStore((state) => state);

  // Use real data from API
  const { ingredients, isLoading, error, mutate } = useUserIngredients(user?.id);

  // State management
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  // Boolean states using useBoolean hook
  const isFormDialogOpen = useBoolean();
  const isDeleteDialogOpen = useBoolean();
  const isInfoDialogOpen = useBoolean();
  const isSubmitting = useBoolean();

  // Event handlers
  const handleAddIngredient = useCallback(() => {
    setSelectedIngredient(null);
    isFormDialogOpen.onTrue();
  }, [isFormDialogOpen]);

  const handleEditIngredient = useCallback(
    (ingredient) => {
      setSelectedIngredient(ingredient);
      isFormDialogOpen.onTrue();
    },
    [isFormDialogOpen]
  );

  const handleDeleteIngredient = useCallback(
    (ingredient) => {
      setSelectedIngredient(ingredient);
      isDeleteDialogOpen.onTrue();
    },
    [isDeleteDialogOpen]
  );

  const deleteIngredient = useCallback(async () => {
    try {
      console.log(selectedIngredient);
      await api.delete(endpoints.user.ingredients(user?.id), {
        params: { ingredientId: selectedIngredient.id },
      });
      isDeleteDialogOpen.onFalse();
    } catch (error) {
      console.error(error);
    } finally {
      await mutate();
    }
  }, [user.id, selectedIngredient, isDeleteDialogOpen, mutate]);

  const updateIngredient = useCallback(
    async (data) => {
      try {
        await api.patch(endpoints.user.ingredients(user.id), data);
        isFormDialogOpen.onFalse();
        await mutate();
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message || 'Failed to update ingredient, please try again', {
          variant: 'error',
        });
      }
    },
    [user.id, isFormDialogOpen, mutate, enqueueSnackbar]
  );

  const handleCloseFormDialog = useCallback(() => {
    isFormDialogOpen.onFalse();
    setSelectedIngredient(null);
  }, [isFormDialogOpen]);

  const handleCloseDeleteDialog = useCallback(() => {
    isDeleteDialogOpen.onFalse();
    setSelectedIngredient(null);
  }, [isDeleteDialogOpen]);

  const handleOpenInfoDialog = useCallback(
    (ingredient) => {
      setSelectedIngredient(ingredient);
      isInfoDialogOpen.onTrue();
    },
    [isInfoDialogOpen]
  );

  const handleCloseInfoDialog = useCallback(() => {
    isInfoDialogOpen.onFalse();
    setSelectedIngredient(null);
  }, [isInfoDialogOpen]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Container sx={{ pb: 20 }}>
        <Stack spacing={4} mt={3}>
          <Alert severity="error" sx={{ textAlign: 'center' }}>
            {t('errorLoadingIngredients')}
          </Alert>
        </Stack>
      </Container>
    );
  }

  return (
    <Container sx={{ pb: 20 }}>
      <Stack spacing={4} mt={3}>
        {ingredients.length === 0 ? (
          <EmptyContent title="noEngredientsFound" sx={{ mt: 8 }} />
        ) : (
          <Grid container spacing={3}>
            {ingredients?.map((ingredient) => (
              <Grid item xs={12} sm={6} md={4} key={ingredient?.id}>
                <Card
                  sx={{
                    p: 2,
                    pb: 1,
                    position: 'relative',
                    backgroundColor: (theme) => theme.palette.background.paper,
                    boxShadow: (theme) => theme.customShadows.card,
                  }}
                >
                  {/* Content */}
                  <CardContent sx={{ py: 2, px: 2, display: 'flex', alignItems: 'center' }}>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemIcon>
                        <Typography variant="h4">{ingredient.icon}</Typography>
                      </ListItemIcon>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {ingredient.name[lang]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ~ {ingredient.serving.weightInGrams}g
                        </Typography>
                      </Box>
                    </ListItem>
                  </CardContent>

                  {/* Actions */}
                  <CardActions
                    sx={{
                      gap: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      borderTop: 'solid 1px',
                      borderColor: 'divider',
                    }}
                  >
                    <IconButton size="small" onClick={() => handleOpenInfoDialog(ingredient)}>
                      <Iconify icon="fluent:info-28-regular" />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => handleEditIngredient(ingredient)}>
                      <Iconify icon="akar-icons:edit" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteIngredient(ingredient)}>
                      <Iconify icon="cuida:trash-outline" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>

      {/* Form Dialog */}
      <IngredientFormDialog
        open={isFormDialogOpen.value}
        onClose={handleCloseFormDialog}
        onSubmit={updateIngredient}
        ingredient={selectedIngredient}
        title={selectedIngredient ? t('editIngredient') : t('addIngredient')}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen.value}
        onClose={handleCloseDeleteDialog}
        title={t('deleteIngredient')}
        content={t('deleteIngredientConfirmation')}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isSubmitting.value}
            onClick={deleteIngredient}
          >
            {t('delete')}
          </LoadingButton>
        }
      />

      {/* Info Dialog */}
      <Dialog
        open={isInfoDialogOpen.value}
        onClose={handleCloseInfoDialog}
        PaperProps={{
          style: {
            width: '100%',
            margin: '16px',
          },
        }}
      >
        {selectedIngredient && (
          <>
            <Stack textAlign="center" py={2}>
              <Typography variant="h2" lineHeight="2rem">
                {selectedIngredient.serving.nutrientFacts.cal}
              </Typography>
              <Typography variant="h5">{t('calorie')}</Typography>
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
                <small>
                  {t('carb')} {selectedIngredient.serving.nutrientFacts.carb}g
                </small>
                <small>
                  {t('pro')} {selectedIngredient.serving.nutrientFacts.pro}g
                </small>
                <small>
                  {t('fat')} {selectedIngredient.serving.nutrientFacts.fat}g
                </small>
              </Stack>
            </Stack>
            <Divider style={{ borderStyle: 'dashed' }} />
            <DialogContent sx={{ pt: 1, pb: 4 }}>
              <Stack spacing={1} alignItems="center">
                <Card sx={{ width: '100%', py: 1, pl: 2, background: 'transparent' }}>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <Typography variant="h4">{selectedIngredient.icon}</Typography>
                    </ListItemIcon>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2">{selectedIngredient.name[lang]}</Typography>
                      <Typography variant="body2">
                        ~ {selectedIngredient.serving.weightInGrams}g{' '}
                        {selectedIngredient.serving.singleLabel[lang]}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Stack flexDirection="row" gap={3} color="text.secondary">
                    <small>
                      {t('carb')} {selectedIngredient.serving.nutrientFacts.carb}g
                    </small>
                    <small>
                      {t('pro')} {selectedIngredient.serving.nutrientFacts.pro}g
                    </small>
                    <small>
                      {t('fat')} {selectedIngredient.serving.nutrientFacts.fat}g
                    </small>
                  </Stack>
                </Card>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Floating Add Button */}
      <CircleButton
        icon="eva:plus-fill"
        width={55}
        style={{ right: 16 }}
        sx={{ position: 'absolute', bottom: 122 }}
        onClick={handleAddIngredient}
      />
    </Container>
  );
}
