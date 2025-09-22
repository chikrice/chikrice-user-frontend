import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Paper, CardHeader } from '@mui/material';

import { useTranslate } from 'src/locales';

import Image from '../image';

const StyledFieldItem = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.paper,
  padding: '16px',
  cursor: 'pointer',
}));

export default function ProfileBody({ fields, onEdit }) {
  const { t } = useTranslate();
  return (
    <Grid container spacing={1}>
      {fields.map((field) => (
        <Grid item xs={4} key={field.id} sx={{ flexGrow: 1 }} onClick={() => onEdit(field.name)}>
          <StyledFieldItem>
            <CardHeader
              sx={{
                alignItems: 'flex-start',
                p: 0,
                '& .MuiCardHeader-title': {
                  fontSize: '0.80rem',
                },
                '& .MuiCardHeader-subheader': {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 100,
                },
                '& .MuiCardHeader-avatar': {
                  marginRight: '12px',
                  width: 30,
                  marginTop: '2px',
                },
              }}
              avatar={<Image src={field.icon} alt={field.title} />}
              title={t(field.title)}
              subheader={field.translatedValue}
            />
          </StyledFieldItem>
        </Grid>
      ))}
    </Grid>
  );
}

ProfileBody.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      translatedValue: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
};
