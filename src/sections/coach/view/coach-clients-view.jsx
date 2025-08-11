import PropTypes from 'prop-types';
import { Avatar, List, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useGetCoachClients } from 'src/api/coach';
import { LoadingScreen } from 'src/components/loading-screen';

export default function CoachClientsView() {
  const { user: coach } = useStore();
  const { clients, isLoading, error } = useGetCoachClients(coach.id);
  console.log('🚀 ~ CoachClientsView ~ clients:', clients);
  const router = useRouter();
  if (isLoading) return <LoadingScreen />;
  if (error) return <div>error</div>;

  return (
    <List>
      {clients.map((client) => (
        <ListItemButton key={client.id} onClick={() => router.push(paths.client(client.id))}>
          <ListItemAvatar>
            <Avatar src={client.picture} alt={client.name}>
              {client.name.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={client.name} />
        </ListItemButton>
      ))}
    </List>
  );
}

CoachClientsView.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profilePic: PropTypes.string,
    })
  ),
};
