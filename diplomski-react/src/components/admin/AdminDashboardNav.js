import { NavLink, useNavigate } from 'react-router-dom';
import classes from './AdminDashboardNav.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';

const AdminDashboardNav = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <header>
      <div>
        <h1>Dashboard</h1>
        <div>
          <p>Signed in as: {currentUser.email}</p>
          <button onClick={logoutHandler}>Log out</button>
        </div>
        {error && <p>{error}</p>}
      </div>
      <nav>
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
