// filler page

import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';

const MainPage = () => {
  const { userData, userDataLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDataLoading) {
      if (userData) {
        if (userData.isAdmin) {
          setLoading(false);
          navigate('/admin');
        } else {
          setLoading(false);
          navigate('/shop');
        }
      } else {
        setLoading(false);
        navigate('/login');
      }
    }
  }, [navigate, userData, userDataLoading]);

  return <>{loading ? <p>Loading...</p> : <Outlet />}</>;
};

export default MainPage;
