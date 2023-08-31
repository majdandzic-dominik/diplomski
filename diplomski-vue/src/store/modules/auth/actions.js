import { auth, database } from '@/firebase';

export default {
  async signup(context, { email, password }) {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    await database.ref('users/' + auth.currentUser.uid).set({
      email: email,
      isAdmin: false,
      likes: ['1'],
    });
    return res;
  },
  async login(context, { email, password }) {
    return auth.signInWithEmailAndPassword(email, password);
  },
  async updateUserData(context) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'users/' +
        auth.currentUser.uid +
        '.json'
    );

    if (!response.ok) {
      throw new Error('Could not load data!');
    }

    const data = await response.json();
    context.commit('setUserData', data);

    // database
    //   .ref()
    //   .child('users')
    //   .child(auth.currentUser.uid)
    //   .get()
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       context.commit('setUserData', snapshot.val());
    //     }
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
  },
  clearUserData(context) {
    context.commit('setUserData', {});
  },
  logout() {
    console.log('brisem');
    return auth.signOut();
  },
};
