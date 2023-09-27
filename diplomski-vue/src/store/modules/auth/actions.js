import { auth, database } from '@/firebase';

export default {
  async signup(context, { email, password }) {
    // const res = Promise.all([
    //   auth.createUserWithEmailAndPassword(email, password),
    //   database.ref('users/' + auth.currentUser.uid).set({
    //     email: email,
    //     isAdmin: false,
    //     likes: ['1'],
    //   }),
    // ]);

    const res = await auth.createUserWithEmailAndPassword(email, password);

    return res;
  },
  async login(context, { email, password }) {
    return auth.signInWithEmailAndPassword(email, password);
  },
  async updateOnlineUserData() {
    await database.ref('users/' + auth.currentUser.uid).set({
      email: auth.currentUser.email,
      isAdmin: false,
      likes: ['1'],
    });
  },
  async updateLocalUserData(context) {
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
  },
  async checkIfNewUser() {
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

    if (data) {
      return false;
    } else {
      return true;
    }
  },
  async updateUserLikes(context, payload) {
    await database.ref('users/' + auth.currentUser.uid).set({
      ...payload,
    });
  },
  clearUserData(context) {
    context.commit('setUserData', {});
  },
  logout() {
    console.log('brisem');
    return auth.signOut();
  },
};
