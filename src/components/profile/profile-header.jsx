import PropTypes from 'prop-types';
import { Paper, CardHeader } from '@mui/material';

import maleSrc from 'src/assets/images/male.png';
import femaleSrc from 'src/assets/images/female.png';

import Image from '../image';
import { RightIcon } from '../carousel/arrow-icons';

export default function ProfileHeader({ name, email, gender, onEdit }) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        p: 2,
        boxShadow: (theme) => theme.customShadows.card,
      }}
      onClick={onEdit}
    >
      <CardHeader
        sx={{ p: 0 }}
        avatar={
          <Image height={50} src={gender === 'male' ? maleSrc : femaleSrc} alt={'user-avatar'} />
        }
        title={name}
        subheader={email}
      />

      <RightIcon />
    </Paper>
  );
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gender: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
};
