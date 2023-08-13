import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../components/auth/AuthenticationForm';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth-context';

const SignUpPage = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      if (userData.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    } else {
      console.log('STAY SIGNUP');
    }
  }, [navigate, userData]);
  return <AuthenticationForm isLogin={false} />;
};

export default SignUpPage;

// export const signUpPageLoader = async () => {
//   console.log(auth.currentUser);
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
//   console.log('stay sign');
//   return null;
// };
