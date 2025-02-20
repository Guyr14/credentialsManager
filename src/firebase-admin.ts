import * as admin from 'firebase-admin';

const serviceAccount = {



};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://passwordssystem-73c2f-default-rtdb.europe-west1.firebasedatabase.app"
});

export const adminDb = admin.database();