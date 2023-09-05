import AuthenticationForm from '../../components/auth/AuthenticationForm';

const SignUpPage = () => {
  // useEffect(() => {
  //   console.log('signup page:');
  //   console.log(userData);
  //   if (userData) {
  //     if (userData.isAdmin) {
  //       navigate('/admin');
  //     } else {
  //       navigate('/shop');
  //     }
  //   } else {
  //     console.log('STAY SIGNUP');
  //   }
  // }, [navigate, userData]);
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
