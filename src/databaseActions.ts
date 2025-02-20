import {User} from "./User";
import {child, DatabaseReference, get, ref, remove, set, update} from "firebase/database";
import {UserAction} from "./UserAction";

import {adminDb} from "./firebase-admin";
import {hashPassword} from "./passwordUtils";

export async function updateNumberOfRetries(user:any, userName: string) {
    const ref = adminDb.ref(userName);

    try {
        await ref.update({
            numOfRemainingTries: user.numOfRemainingTries,
            isBlocked: user.isBlocked,
        });
    } catch (error) {
        console.error('Error updating user number of retries:', error);
        throw error;
    }
}

export async function saveUserInDb(user: User, userName: string) {
    // Hash the password before saving
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    console.log('saving new user in DB');
    const ref = adminDb.ref(userName);
    await ref.set(user);
}

export async function updateUser(user: User, userName: string): Promise<void> {
    console.log('Updating user in DB, user saved:', userName);

    const ref = adminDb.ref(userName);

    try {
        await ref.update({
            password: user.password,
            numOfRemainingTries: user.numOfRemainingTries,
            notificationTime: user.notificationTime,
            isBlocked: user.isBlocked,
            passwordLastTimeChanged: user.passwordLastTimeChanged,
            storedCredentials: user.storedCredentials,
        });
        console.log('User updated successfully!');
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function getUserFromDatabase(userName: string): Promise<User | undefined> {
    try {
        const ref = adminDb.ref(userName);
        const snapshot = await ref.get();

        if (snapshot.exists()) {
            console.log("User found in Database and retrieved");
            return UserAction.fromUser(snapshot.val());
        } else {
            console.log("User not found in Database");
            return undefined;
        }
    } catch (error) {
        console.error('error occurred: ' + error);
        return undefined;
    }
}

export function updateNumOfRetries(user: User, numOfRemainingRetries: number) {
    UserAction.updateNumOfRetries(user);

    console.log(('you have '+ (numOfRemainingRetries - 1) + ' remaining retries before your user will be blocked'));

    if (numOfRemainingRetries === 1) {
        user.setIsBlocked(true);
        console.log('user: ' + user.getUserName() + ' is in blocked state');
    }
}

export async function removeFromDatabase(userName: string) {
    const ref = adminDb.ref(userName);

    try {
        await ref.remove();
        console.log('User data removed successfully');
    } catch (error) {
        console.error('Error removing user data:', error);
        throw error;
    }
}