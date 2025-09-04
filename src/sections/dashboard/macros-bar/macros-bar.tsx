import { useState } from 'react';
import { PlanType } from 'chikrice-types';
import { Box, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

// -------------------------------------

interface MacrosBarProps {
  plan: PlanType;
}

export default function MacrosBar({ plan, ...other }: MacrosBarProps) {
  const theme = useTheme();
  const [isShowMacros, setIsShowMacros] = useState(true);

  const renderMacroBar = () => (
    <Box>
      <Collapse in={isShowMacros}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CalorieInfo label="targetCalories" value={plan?.targetMacros?.cal} />
          <CalorieInfo label="todayCalories" value={plan?.consumedMacros?.cal.toFixed(0)} />
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
            <MacroItem icon="🥩" label="pro" value={plan?.consumedMacros?.pro.toFixed(0)} />
            <MacroItem icon="🥔" label="carb" value={plan?.consumedMacros?.carb.toFixed(0)} />
            <MacroItem icon="🌻" label="fat" value={plan?.consumedMacros?.fat.toFixed(0)} />
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
