import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Iconify from 'src/components/iconify';
import MarkdownDescription from 'src/components/markdown/markdown-description';

export default function LessonAccordion({ list }) {
  const currentLesson = 5;
  const [expanded, setExpanded] = useState(`lesson-${currentLesson}`); // Track which accordion is expanded

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const lessonIcon = (number) =>
    number < currentLesson
      ? 'flat-color-icons:ok'
      : number === currentLesson
        ? 'line-md:circle'
        : 'fxemoji:lock';

  return (
    <div>
      {list.map((lesson) => (
        <Accordion
          key={lesson.number}
          disabled={lesson.number > currentLesson} // Disable lessons greater than the currentLesson
          expanded={expanded === `lesson-${lesson.number}`} // Open currentLesson by default
          onChange={handleChange(`lesson-${lesson.number}`)} // Handle expansion change
          sx={{ border: lesson.number === currentLesson ? 'solid 1px lightgray' : '' }}
        >
          <AccordionSummary>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography>
                Lesson {lesson.number}:<b> {lesson.title}</b>
              </Typography>
              <Iconify icon={lessonIcon(lesson.number)} />
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <MarkdownDescription description={lesson.content} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

LessonAccordion.propTypes = {
  list: PropTypes.array.isRequired,
};
