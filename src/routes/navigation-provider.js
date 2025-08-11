import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { setNavigate } from './navigation';

export default function NavigationProvider() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
}
