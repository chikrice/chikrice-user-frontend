import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';
//

import { LeftIcon, RightIcon } from './arrow-icons';

// ----------------------------------------------------------------------

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'filled' && prop !== 'hasChild' && prop !== 'shape',
})(({ filled, shape, hasChild, theme }) => ({
  color: 'inherit',
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.shorter,
  }),
  ...(shape === 'rounded' && {
    borderRadius: theme.shape.borderRadius * 1.5,
  }),
  ...(!filled && {
    opacity: 0.48,
    '&:hover': {
      opacity: 1,
    },
  }),
  ...(filled && {
    color: alpha(theme.palette.common.white, 0.8),
    backgroundColor: alpha(theme.palette.grey[700], 0.48),
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[700],
    },
  }),
  ...(hasChild && {
    zIndex: 9,
    top: 0,
    position: 'absolute',
    // marginTop: theme.spacing(-2.5),
  }),
}));

// ----------------------------------------------------------------------

export default function CarouselArrows({
  shape = 'circular',
  filled = false,
  icon,
  onNext,
  onPrev,
  children,
  leftButtonProps,
  rightButtonProps,
  dataLength,
  sx,
  ...other
}) {
  const hasChild = !!children;

  if (hasChild) {
    return (
      <Stack sx={sx} {...other}>
        {onNext && (
          <StyledIconButton
            filled={filled}
            shape={shape}
            hasChild={!!children}
            onClick={onPrev}
            {...leftButtonProps}
            sx={{
              display: { xs: 'none', md: dataLength > 4 ? 'flex' : 'none' },
              right: 66,
              ...leftButtonProps?.sx,
            }}
          >
            <LeftIcon icon={icon} />
          </StyledIconButton>
        )}

        {children}

        {onPrev && (
          <StyledIconButton
            filled={filled}
            shape={shape}
            hasChild={!!children}
            onClick={onNext}
            {...rightButtonProps}
            sx={{
              display: { xs: 'none', md: dataLength > 4 ? 'flex' : 'none' },
              right: 16,
              ...rightButtonProps?.sx,
            }}
          >
            <RightIcon icon={icon} />
          </StyledIconButton>
        )}
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" display="inline-flex" sx={sx} {...other}>
      <StyledIconButton filled={filled} shape={shape} onClick={onPrev} {...leftButtonProps}>
        <LeftIcon icon={icon} />
      </StyledIconButton>

      <StyledIconButton filled={filled} shape={shape} onClick={onNext} {...rightButtonProps}>
        <RightIcon icon={icon} />
      </StyledIconButton>
    </Stack>
  );
}

CarouselArrows.propTypes = {
  children: PropTypes.node,
  filled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  leftButtonProps: PropTypes.object,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  rightButtonProps: PropTypes.object,
  shape: PropTypes.oneOf(['circular', 'rounded']),
  sx: PropTypes.object,
  dataLength: PropTypes.number,
};
