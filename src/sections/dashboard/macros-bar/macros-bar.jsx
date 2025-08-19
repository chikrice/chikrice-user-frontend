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

export default function MacrosBar({ plan, isLoading, ...other }) {
  const theme = useTheme();
  const [isShowMacros, setIsShowMacros] = useState(true);

  const renderMacroBar = () => (
    <Box>
      <Collapse in={isShowMacros}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CalorieInfo label="targetCalories" value={plan?.targetMacros?.cal} isLoading={isLoading} />
          <CalorieInfo
            label="todayCalories"
            value={plan?.consumedMacros?.cal.toFixed(0)}
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
              <Box sx={allowedCalFillStyles(plan?.targetMacros?.cal, plan?.consumedMacros?.cal)} />
              {/* Over-consumed Calories Fill */}
              <Box sx={overConsumedCalFillStyles(plan?.targetMacros?.cal, plan?.consumedMacros?.cal)} />
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
        {!!plan?.consumedMacros?.cal && (
          <Box sx={macroBreakdownStyles}>
            <MacroItem
              icon="🥩"
              label="pro"
              value={plan?.consumedMacros?.pro.toFixed(0)}
              isLoading={isLoading}
            />
            <MacroItem
              icon="🥔"
              label="carb"
              value={plan?.consumedMacros?.carb.toFixed(0)}
              isLoading={isLoading}
            />
            <MacroItem
              icon="🌻"
              label="fat"
              value={plan?.consumedMacros?.fat.toFixed(0)}
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
      {renderMacroBar()}
      <MacrosBarCollapseBtn isIn={isShowMacros} onClick={() => setIsShowMacros(!isShowMacros)} />
    </Box>
  );
}

MacrosBar.propTypes = {
  plan: PropTypes.object,
  isLoading: PropTypes.bool,
};
