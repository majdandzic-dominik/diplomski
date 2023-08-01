import { NavLink } from 'react-router-dom';
import classes from './AdminDashboardNav.module.css';

const AdminDashboardNav = () => {
  return (
    <header>
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
