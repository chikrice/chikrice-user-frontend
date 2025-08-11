import PropTypes from 'prop-types';

import Markdown from './markdown';

// ----------------------------------------------------------------------

export default function MarkdownDescription({ description }) {
  return (
    <Markdown
      // eslint-disable-next-line react/no-children-prop
      children={description}
      sx={{
        '& p, li, ol': {
          typography: 'body2',
        },
        '& ul': {
          pl: 2,
        },
        '& ol': {
          p: 0,
          display: { md: 'flex' },
          listStyleType: 'none',
          '& li': {
            '&:first-of-type': {
              minWidth: 240,
              mb: { xs: 0.5, md: 0 },
            },
          },
        },
      }}
    />
  );
}

MarkdownDescription.propTypes = {
  description: PropTypes.string,
};
