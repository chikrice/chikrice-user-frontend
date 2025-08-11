//import PropTypes from 'prop-types';

import { Alert, Container, Stack, Typography } from '@mui/material';

import LessonAccordion from '../lessons/lesson-accordion';

export default function LearnView() {
  const data = [
    {
      number: 1,
      title: 'The basics',
      content:
        '<h5>How our weight change?</h5><p>answer</p><br /><h5>How gens impact our weight change?</h5><p>answer</p><br /><h4>How lifestyle impact weight change?</h4><p>answer</p>',
    },
    { number: 2, title: 'Macro Counting', content: 'content' },
    { number: 3, title: 'Macro Counting', content: 'content' },
    { number: 4, title: 'Macro Counting', content: 'content' },
    { number: 5, title: 'Macro Counting', content: 'content' },
  ];
  return (
    <Container>
      <Alert variant="outlined">
        <Typography variant="h4">Welcome Khaled 🥳</Typography>
        we are happy that you made the right decision
      </Alert>
      <Typography variant="h6" mt={4} textAlign={'center'}>
        before telling you what to eat and what excersice to do, you need to know the basics
      </Typography>
      <Stack mt={3}>
        <LessonAccordion list={data} />
      </Stack>
    </Container>
  );
}

//LearnView.propTypes = {}
