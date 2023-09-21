import { redirect } from 'react-router-dom';
import AuthenticationForm from '../../components/auth/AuthenticationForm';
import { auth, database } from '../../firebase';

const LoginPage = () => {
  // useEffect(() => {
  //   if (userData) {
  //     if (userData.isAdmin) {
  //       navigate('/admin');
  //     } else {
  //       navigate('/shop');
  //     }
  //   } else {
  //     console.log('STAY LOGIN');
  //   }
  // }, [navigate, userData]);
  return <AuthenticationForm isLogin={true} />;
};

export default LoginPage;

export const loginPageLoader = async () => {
  if (auth.currentUser) {
    const user = await database
      .ref('/users/' + auth.currentUser.uid)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });

    if (user.isAdmin) {
      return redirect('/admin');
    } else {
      return redirect('/shop');
    }
  }

  return null;
};
