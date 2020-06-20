import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const serviceAccount = require('../credentials/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://wow-class-guides.firebaseio.com'
});

export const checkUserNicknameExistence = functions.https.onCall((data, context) => {
  if (!(typeof data.nickname === 'string') || data.nickname.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Nickname is required');
  }

  const docRef = admin.firestore().collection('nicknames').doc(data.nickname);

  return docRef.get()
  .then(doc => {
    if(doc.exists) {
      throw new functions.https.HttpsError('already-exists', 'That nickname is already in use');
    }
  })
  .catch(error => {
    throw new functions.https.HttpsError(error.code, error.message);
  });
});

export const addUserNickname = functions.https.onCall((data, context) => {
  const docRef = admin.firestore().collection('nicknames').doc(data.nickname);

  return docRef.set({})
    .then(() => {
      console.log('New nicknames was added!');
      return {nickname: data.nickname};
    }).catch((error) => {
      console.log('That nickname is already in use');
      throw new functions.https.HttpsError('unknown', 'There is a problem please try again later');
    });
});
