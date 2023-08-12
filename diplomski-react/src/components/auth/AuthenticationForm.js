import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const AuthenticationForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup, login } = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (props.isLogin) {
      try {
        setError('');
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        navigate('/shop')
      } catch (e) {
        setError(e.message);
      }
    } else {
      try {
        setError('');
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate('/admin')
      } catch (e) {
        setError(e.message);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>{props.isLogin ? 'Log in' : 'Create a new user'}</h1>
      {error && <p>{error}</p>}
      <p>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          id="password"
          type="password"
          name="password"
          required
        />
      </p>
      <div>
        {props.isLogin ? (
          <Link to={'/signup'}>Create new user</Link>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}

        <button disabled={loading} type="submit">
          {props.isLogin ? 'Log in' : 'Sign up'}
        </button>
      </div>
    </form>
  );
};

export default AuthenticationForm;
