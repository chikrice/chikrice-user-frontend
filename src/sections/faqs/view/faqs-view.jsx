import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

import FaqsHero from '../faqs-hero';
import FaqsForm from '../faqs-form';
// import AccordionList from 'src/components/accordion-list';

// ----------------------------------------------------------------------

export default function FaqsView() {
  return (
    <>
      <FaqsHero />

      <Container
        sx={{
          pb: 10,
          // pt: { xs: 10, md: 15 },
          position: 'relative',
        }}
      >
        {/* <Typography
          variant="h3"
          sx={{
            my: { xs: 5, md: 10 },
          }}
        >
          Frequently asked questions
        </Typography> */}

        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {/* <AccordionList list={_faqs} /> */}

          <FaqsForm />
        </Box>
      </Container>
    </>
  );
}
