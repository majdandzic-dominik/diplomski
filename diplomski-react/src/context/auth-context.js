import { createContext, useEffect, useState } from 'react';
import { auth, database } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();

  const signup = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
    database.ref('users/' + auth.currentUser.uid).set({
      email: email,
      isAdmin: false,
      likes: ['1'],
    });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    setUserData(null);
    return auth.signOut();
  };

  const updateLocalUserData = () => {
    database
      .ref()
      .child('users')
      .child(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
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
      if (auth.currentUser) {
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
