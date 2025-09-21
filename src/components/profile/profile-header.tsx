import { Paper, CardHeader } from '@mui/material';

import maleSrc from 'src/assets/images/male.png';
import femaleSrc from 'src/assets/images/female.png';

import Image from '../image';
import { RightIcon } from '../carousel/arrow-icons';

// -------------------------------------

interface ProfileHeaderProps {
  name: string;
  email: string;
  gender: string;
  picture: string;
  onEdit: () => void;
}

export default function ProfileHeader({ name, email, gender, picture, onEdit }: ProfileHeaderProps) {
  console.log(picture);
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        cursor: 'pointer',
        p: 2,
        boxShadow: (theme) => theme.customShadows.card,
      }}
      onClick={onEdit}
    >
      <CardHeader
        sx={{ p: 0 }}
        avatar={<Image height={50} src={gender === 'male' ? maleSrc : femaleSrc} alt={'user-avatar'} />}
        title={name}
        subheader={email}
      />

      <RightIcon width={24} />
    </Paper>
  );
}
