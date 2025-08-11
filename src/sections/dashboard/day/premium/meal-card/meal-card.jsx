import PropTypes from 'prop-types';
import { Box, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';

import InfoDialog from '../info-dialog';
import ViewActionsContent from '../../common/view-actions-content';
import AlternativesDrawerPremium from '../alternatives-drawer-premium';
import { actionsStyle, cardStyle, contentStyle, headerStyle } from '../../common/styles';

export default function MealCardPremium({
  id,
  name,
  type,
  imgUrl,
  macros,
  mealNumber,
  alternatives,
}) {
  const { t } = useTranslate();

  const isInfo = useBoolean();
  const isAlternatives = useBoolean();
  return (
    <>
      <Card sx={cardStyle}>
        {/* Header */}
        <Box sx={headerStyle}>
          <Stack>
            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
              {type === 'snack' ? t('snack') : t('meal')} {mealNumber}
            </Typography>

            <Typography variant="body2" color={'text.secondary'}>
              {macros.cal.toFixed()} {t('calorie')}
            </Typography>
          </Stack>
        </Box>

        {/* Body */}
        <CardContent sx={contentStyle}>
          <Box sx={{ width: '60%', pb: 1 }}>
            <Typography variant="subtitle2">{name.ar}</Typography>
            <Typography variant="body2" color={'text.secondary'}>
              {name.en}
            </Typography>
          </Box>

          <Image
            src={imgUrl}
            alt={'meal'}
            sx={{
              width: '90px',
              borderRadius: 2,
              ratio: '1/1',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '5%',
            }}
          />
        </CardContent>

        {/* Actions */}
        <CardActions sx={actionsStyle}>
          <ViewActionsContent
            index={1}
            isPast={false}
            planDayId={'1'}
            onShowInfo={isInfo.onTrue}
            onListAlternatives={isAlternatives.onTrue}
          />
        </CardActions>
      </Card>

      {/* Info */}
      <InfoDialog open={isInfo.value} onClose={isInfo.onFalse} macros={macros} />

      {/* Drawers */}
      <AlternativesDrawerPremium
        open={isAlternatives.value}
        onOpen={isAlternatives.onTrue}
        onClose={isAlternatives.onFalse}
        alternatives={alternatives}
        currentMeal={{ id, name, imgUrl, calorie: macros.cal, mealNumber }}
      />
    </>
  );
}

MealCardPremium.propTypes = {
  id: PropTypes.number,
  name: PropTypes.object,
  type: PropTypes.string,
  imgUrl: PropTypes.string,
  macros: PropTypes.object,
  mealNumber: PropTypes.number,
  alternatives: PropTypes.array,
};
