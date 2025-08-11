import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { alpha } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

import { useTranslate } from 'src/locales';

export default function RHFTextarea({ name, helperText, ...other }) {
  const { control } = useFormContext();

  const { t } = useTranslate();

  useEffect(() => {
    // Get all textarea elements and replace \\n with \n in the placeholder
    const textAreas = document.getElementsByTagName('textarea');
    Array.prototype.forEach.call(textAreas, function (elem) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Textarea
          {...field}
          aria-label="minimum height"
          minRows={4}
          placeholder={`* ${t('limitedBudget')} \n* ${t('noTime')} \n* ${t('apPlaceholder2')} `}
          value={field.value}
          onChange={field.onChange}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

RHFTextarea.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
};

export const Textarea = styled(BaseTextareaAutosize)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  boxSizing: 'border-box',
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: 1.5,
  padding: '16px',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  border: `none`,
  resize: 'none',
  whiteSpace: 'pre-line',

  '&::placeholder': {
    color: theme.palette.text.disabled,
    opacity: 1,
  },

  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.16),
  },

  '&:focus': {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.grey[500], 0.16),
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.32)}`,
  },

  '&.Mui-error': {
    borderColor: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.08),
    '&:focus': {
      backgroundColor: alpha(theme.palette.error.main, 0.16),
      boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.32)}`,
    },
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    '& svg': {
      color: theme.palette.text.disabled,
    },
  },

  // firefox
  '&:focus-visible': {
    outline: 0,
  },
}));
