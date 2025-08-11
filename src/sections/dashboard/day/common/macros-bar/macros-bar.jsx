import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { Box, Collapse } from '@mui/material';

import MacroItem from './macro-item';
import CalorieInfo from './calorie-info';
import { MacrosBarCollapseBtn } from './collapse-button';
import {
  progressBarStyles,
  allowedCalFillWrapper,
  allowedCalFillStyles,
  calorieLineStyles,
  calorieIconStyles,
  macroBreakdownStyles,
  stickyBarStyles,
  overConsumedCalFillStyles,
} from './styles';

export default function MacrosBar({ isPro, targetMacros, consumedMacros, isLoading, ...other }) {
  const theme = useTheme();
  const [isShowMacros, setIsShowMacros] = useState(true);

  const renderMacroBar = () => (
    <Box>
      <Collapse in={isShowMacros}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CalorieInfo label="targetCalories" value={targetMacros?.cal} isLoading={isLoading} />
          <CalorieInfo
            label="todayCalories"
            value={consumedMacros?.cal.toFixed(0)}
            isLoading={isLoading}
          />
        </Box>
      </Collapse>

      {/* Progress Bar */}
      <Box sx={{ position: 'relative' }}>
        <Box sx={progressBarStyles}>
          {/* Progress Bar */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 20,
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: theme.palette.card.default,
              mb: 0.5,
            }}
          >
            <Box sx={allowedCalFillWrapper}>
              {/* Allowed Calories Fill */}
              <Box sx={allowedCalFillStyles(targetMacros?.cal, consumedMacros?.cal)} />
              {/* Over-consumed Calories Fill */}
              <Box sx={overConsumedCalFillStyles(targetMacros?.cal, consumedMacros?.cal)} />
            </Box>
          </Box>
        </Box>

        <Box sx={calorieLineStyles} />
        <Box sx={calorieIconStyles}>
          <span>🔥</span>
        </Box>
      </Box>

      {/* Macros Breakdown */}
      <Collapse in={isShowMacros}>
        {!!consumedMacros?.cal && (
          <Box sx={macroBreakdownStyles}>
            <MacroItem
              icon="🥩"
              label="pro"
              value={consumedMacros?.pro.toFixed(0)}
              isLoading={isLoading}
            />
            <MacroItem
              icon="🥔"
              label="carb"
              value={consumedMacros?.carb.toFixed(0)}
              isLoading={isLoading}
            />
            <MacroItem
              icon="🌻"
              label="fat"
              value={consumedMacros?.fat.toFixed(0)}
              isLoading={isLoading}
            />
          </Box>
        )}
      </Collapse>
    </Box>
  );

  return (
    <Box
      {...other}
      sx={{
        ...stickyBarStyles,
        boxShadow: theme.customShadows.macrosBar,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {isPro ? renderMacroBar() : <Box>Free</Box>}
      <MacrosBarCollapseBtn isIn={isShowMacros} onClick={() => setIsShowMacros(!isShowMacros)} />
    </Box>
  );
}

MacrosBar.propTypes = {
  isPro: PropTypes.bool,
  isLoading: PropTypes.bool,
  targetMacros: PropTypes.object,
  consumedMacros: PropTypes.object,
};
