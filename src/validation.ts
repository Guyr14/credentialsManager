import {updateNumOfRetries} from "./databaseActions";
import {UserAction} from "./UserAction";
import {verifyPassword} from "./passwordUtils";

export async function isCorrectPassword(user: any, userPassword: string, HashedPassword: string): Promise<boolean> {
    const isCorrectPassword: boolean = await verifyPassword(userPassword, HashedPassword);
    if (!isCorrectPassword) {
        console.log(('password is incorrect'));
        updateNumOfRetries(user, UserAction.getNumOfRemainingRetries(user));
        return false;
    }
    return true;
}