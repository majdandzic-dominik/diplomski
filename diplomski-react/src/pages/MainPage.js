// filler page

import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';

const MainPage = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      if (userData.isAdmin) {
        console.log('TO ADMIN')
        navigate('/admin');
      } else {
        console.log('TO SHOP')
        navigate('/shop');
      }
    } else {
      console.log('TO LOGIN')
      navigate('/login');
    }
  }, [navigate, userData]);

  return <Outlet />;
};

export default MainPage;
