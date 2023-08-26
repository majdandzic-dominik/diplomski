// filler page

import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';

const MainPage = () => {
  const { userData, userDataLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('main page:');
    console.log(userData);
    if (!userDataLoading) {
      if (userData) {
        if (userData.isAdmin) {
          console.log('TO ADMIN');
          setLoading(false);
          navigate('/admin');
        } else {
          console.log('TO SHOP');
          setLoading(false);
          navigate('/shop');
        }
      } else {
        console.log('TO LOGIN');
        setLoading(false);
        navigate('/login');
      }
    }
  }, [navigate, userData, userDataLoading]);

  return <>{loading ? <p>Loading...</p> : <Outlet />}</>;
};

export default MainPage;
