import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function FaqsHero() {
  const { t } = useTranslate();

  return (
    <Box
      sx={{
        height: { md: 420 },
        py: 4,
        position: 'relative',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 50 },
            position: { md: 'absolute' },
            textAlign: 'left',
          }}
        >
          <TextAnimate
            text={t('ask')}
            sx={{ color: 'primary.main', fontSize: '3rem' }}
            variants={varFade().inRight}
          />
          <br />

          <Stack
            spacing={1}
            display="flex"
            flexWrap="wrap"
            direction="row"
            sx={{ color: 'text.primary' }}
          >
            <TextAnimate text={t('any')} />
            <TextAnimate text={t('question')} />
            <TextAnimate text={t('you')} />
            <TextAnimate text={t('have!')} />
          </Stack>

          <Stack mt={3} variants={varFade().inRight} component={m.div}>
            <Typography color={'text.secondary'} maxWidth={600}>
              {t('faqsHeroMessage.part1')}
              <a
                href="https://www.linkedin.com/in/khaled-javdan/"
                target="_blanck"
                style={{ margin: '0 4px' }}
              >
                {t('khaled')}
              </a>
              {t('faqsHeroMessage.part2')}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
