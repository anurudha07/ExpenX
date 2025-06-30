import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Logout = () => {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    // clear your token
    localStorage.removeItem('token');
    
    clearUser();
    
    // send them to login
    navigate('/login', { replace: true });
  }, [clearUser, navigate]);

  return null; 
}

export default Logout;
