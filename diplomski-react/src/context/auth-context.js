import { createContext, useEffect, useState } from 'react';
import { auth, database } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [userDataLoading, setUserDataLoading] = useState(false);

  const signup = async (email, password) => {

    const res = await auth.createUserWithEmailAndPassword(email, password);
    await database.ref('users/' + auth.currentUser.uid).set({
      email: email,
      isAdmin: false,
      likes: ['1'],
    });
    return res;
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    console.log('logging out page:');

    return auth.signOut();
  };

  const updateLocalUserData = () => {
    setUserDataLoading(true);
    console.log('uso je u update');
    database
      .ref()
      .child('users')
      .child(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
          setUserDataLoading(false);
          console.log('uso je u if');
        } else {
          setUserDataLoading(false);
          console.log('uso je u else');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateOnlineUserData = async (data) => {
    await database.ref('users/' + auth.currentUser.uid).set(data);
    if (auth.currentUser) {
      updateLocalUserData();
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log('uso je u unsubscribe');
      if (auth.currentUser) {
        console.log('uso je u IF');
        updateLocalUserData();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    userData,
    updateLocalUserData,
    updateOnlineUserData,
    userDataLoading,
    setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
