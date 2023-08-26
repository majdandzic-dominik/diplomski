import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../components/auth/AuthenticationForm';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth-context';

const LoginPage = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

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

// export const loginPageLoader = async () => {
//   console.log('LOGIN CUR USER>' + auth.currentUser);
//   if (auth.currentUser) {
//     const user = await database
//       .ref('/users/' + auth.currentUser.uid)
//       .once('value')
//       .then((snapshot) => {
//         return snapshot.val();
//       });

//     if (user.isAdmin) {
//       console.log('to admin');
//       return redirect('/admin');
//     } else {
//       console.log('to shop');
//       return redirect('/shop');
//     }
//   }
//   console.log('stay login');
//   return null;
// };
