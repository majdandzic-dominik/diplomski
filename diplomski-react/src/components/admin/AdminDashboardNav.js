import { NavLink, useNavigate } from 'react-router-dom';
import classes from './AdminDashboardNav.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';

const AdminDashboardNav = () => {
  const [error, setError] = useState('');
  const { currentUser, logout, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setError('');

    try {
      await logout();
      setUserData(null);
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes['header-basic']}>
        <h1>Dashboard</h1>
        {currentUser && (
          <div className={classes.info}>
            <p>
              <strong>Signed in as:</strong> {currentUser.email}
            </p>
            <button onClick={logoutHandler}>Log out</button>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
      <nav className={classes.navigation}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="meals"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Meals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="categories"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="ingredients"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Ingredients
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminDashboardNav;
