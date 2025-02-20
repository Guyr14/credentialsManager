import { adminDb } from './firebase-admin';
import { StoredCredential } from './StoredCredential';

export async function addStoredCredential(
    userName: string,
    serviceName: string,
    serviceUsername: string,
    servicePassword: string
): Promise<StoredCredential> {
    try {
        const credential = new StoredCredential(serviceName, serviceUsername, servicePassword);
        const ref = adminDb.ref(`users/${userName}/storedCredentials/${serviceName}`);
        await ref.set(credential);
        console.log('Credential saved successfully');
        return credential;
    } catch (error) {
        console.error('Error saving credential:', error);
        throw error;
    }
}

export async function removeStoredCredential(userName: string, accountId: string): Promise<void> {
    try {
        const ref = adminDb.ref(`users/${userName}/storedCredentials/${accountId}`);
        await ref.remove();
        console.log('Credential removed successfully');
    } catch (error) {
        console.error('Error removing credential:', error);
        throw error;
    }
}

export async function getStoredCredentials(userName: string): Promise<StoredCredential[]> {
    try {
        const ref = adminDb.ref(`users/${userName}/storedCredentials`);
        const snapshot = await ref.get();

        if (snapshot.exists()) {
            const credentials: StoredCredential[] = [];
            snapshot.forEach((childSnapshot) => {
                credentials.push(StoredCredential.fromJSON(childSnapshot.val()));
            });
            return credentials;
        }
        return [];
    } catch (error) {
        console.error('Error retrieving credentials:', error);
        throw error;
    }
}

export async function updateStoredCredential(
    userName: string,
    serviceName: string,
    newPassword: string
): Promise<void> {
    try {
        const ref = adminDb.ref(`users/${userName}/storedCredentials/${serviceName}`);
        const snapshot = await ref.get();

        if (!snapshot.exists()) {
            throw new Error('Credential not found');
        }

        const credential = snapshot.val();
        credential.password = newPassword;
        credential.dateAdded = Date.now();

        await ref.update({
            password: newPassword,
            dateAdded: Date.now()
        });

        console.log('Credential updated successfully');
    } catch (error) {
        console.error('Error updating credential:', error);
        throw error;
    }
}