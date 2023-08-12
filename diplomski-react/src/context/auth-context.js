import { createContext, useEffect, useState } from 'react';
import { auth, database } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // const addHandler = async (item, type, method) => {
  //   setError(null);
  //   if (categories.some((e) => e.value === item.value)) {
  //     setError('Category already exists');
  //   } else {
  //     let url = apiURL + type + '.json';
  //     if (method === 'PATCH') {
  //       url = apiURL + type + '/' + item.id + '.json';
  //     }
  //     try {
  //       const response = await fetch(url, {
  //         method: 'POST',
  //         body: JSON.stringify(item),
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error('Could not save data!');
  //       }

  //       fetchHandler();
  //       if (method === 'POST') {
  //         hideAddForm();
  //       }
  //       if (method === 'PATCH') {
  //         hideEditForm();
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   }
  // };

  const signup = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
    database.ref('users/' + auth.currentUser.uid).set({
      email: email,
      isAdmin: false,
      likes: [],
    });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
