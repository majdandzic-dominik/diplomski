import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import classes from './AuthenticationForm.module.css';

const AuthenticationForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup, login, userData } = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (props.isLogin) {
      try {
        setError('');
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        if (userData.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/shop');
        }
      } catch (e) {
        setError(e.message);
      }
    } else {
      try {
        setError('');
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate('/shop');
      } catch (e) {
        setError(e.message);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <h1>{props.isLogin ? 'Login' : 'Register'}</h1>
      {error && <p className={classes.error}>{error}</p>}
      <p>
        <label htmlFor="email">Email</label>
        <input
          ref={emailRef}
          id="email"
          type="email"
          name="email"
          maxLength={64}
          required
        />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          id="password"
          type="password"
          name="password"
          maxLength={32}
          required
        />
      </p>
      <div className={classes.actions}>
        {props.isLogin ? (
          <Link to={'/signup'}>Create new user</Link>
        ) : (
          <Link to={'/login'}>Log in as existing user</Link>
        )}

        <button disabled={loading} type="submit">
          {props.isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default AuthenticationForm;
